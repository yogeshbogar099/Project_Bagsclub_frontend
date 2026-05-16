import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Loader2, Upload, Mail, CheckCircle, AlertCircle, X, 
    ShoppingBag, Palette, Ruler, FileText, Globe, Wallet, Truck
} from 'lucide-react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';

// Assets
import D_cut from '../../../assets/d_Cut.jpg';

const DCutBagOrder = () => {
    const navigate = useNavigate();
    const { updateWalletBalance } = useAuth();
    const [loading, setLoading] = useState(false);
    const [pricePerBag, setPricePerBag] = useState(5); // Placeholder base price
    const [dragActive, setDragActive] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        printingPress: '', // Changed to empty for "not select by default"
        orderName: '',
        bagType: '', // Changed to empty
        quantity: '', // Changed to empty
        bagSize: '', // Changed to empty
        bagColor: '', // Changed to empty
        textColorType: '', // Changed to empty
        textColorSelection: [], 
        privacy: '', // Changed to empty
        deliveryOption: 'Dispatch By Transport',
        fileOption: 'Attach File Online',
        email: '',
        fileUrl: '',
        file: null, // To store actual file object
        sellingPrice: 0,
        remark: '',
        pressline: ''
    });

    const [errors, setErrors] = useState({});

    const bagSizes = ['10 X 12', '12 X 14', '14 X 16', '16 X 20'];
    const bagColors = ['Red', 'Green', 'Yellow', 'White', 'Blue', 'Black'];
    const textColorTypes = ['Single color', 'Two color', 'Multi color'];
    
    const textColorOptions = ['Red', 'Green', 'Blue', 'Black', 'White', 'Golden', 'Silver', 'Cyan', 'Magenta', 'Yellow'];

    // Pricing Calculation
    const [costs, setCosts] = useState({
        applicableCost: 0,
        gst: 0,
        totalAmount: 0
    });

    useEffect(() => {
        const qty = Number(formData.quantity) || 0;
        const base = qty * pricePerBag;
        const privacyCharge = formData.privacy === 'Required' ? 100 : 0;
        const emailCharge = formData.fileOption === 'Send via Email' ? 100 : 0;
        
        const actualPrice = base + privacyCharge + emailCharge;
        const applicableCost = actualPrice * 0.7; 
        const gst = applicableCost * 0.18;
        const totalAmount = applicableCost + gst;

        setCosts({ applicableCost, gst, totalAmount });
        setFormData(prev => ({ ...prev, sellingPrice: actualPrice }));
    }, [formData.quantity, formData.privacy, formData.fileOption, pricePerBag]);

    const validateField = (name, value) => {
        let error = '';
        if (!value || (Array.isArray(value) && value.length === 0)) {
            error = 'This field is required';
        } else if (name === 'quantity' && Number(value) < 1000) {
            error = 'Minimum quantity is 1000';
        }
        setErrors(prev => ({ ...prev, [name]: error }));
        return !error;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
        
        if (name === 'fileOption') {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                ...(value === 'Send via Email'
                    ? { file: null, fileUrl: '' }
                    : { email: '' })
            }));
            return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleColorSelect = (color) => {
        const type = formData.textColorType;
        if (!type) {
            toast.error('Please select Text Color Type first');
            return;
        }

        const currentSelection = [...formData.textColorSelection];
        const index = currentSelection.indexOf(color);

        if (index > -1) {
            currentSelection.splice(index, 1);
        } else {
            if (type === 'Single color') {
                setFormData(prev => ({ ...prev, textColorSelection: [color] }));
                validateField('textColorSelection', [color]);
                return;
            } else if (type === 'Two color') {
                if (currentSelection.length < 2) {
                    currentSelection.push(color);
                } else {
                    toast.error('You can only select two colors');
                    return;
                }
            } else {
                currentSelection.push(color);
            }
        }
        setFormData(prev => ({ ...prev, textColorSelection: currentSelection }));
        validateField('textColorSelection', currentSelection);
    };

    const handleFile = (file) => {
        if (!file) return;

        if (file.size > 100 * 1024 * 1024) {
            toast.error("File size exceeds 100MB limit");
            return;
        }

        const allowedExtensions = ['pdf', 'cdr', 'psd', 'jpeg', 'jpg', 'png'];
        const extension = file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(extension)) {
            toast.error("Invalid file format");
            return;
        }

        setFormData(prev => ({ ...prev, file: file, fileUrl: file.name }));
        validateField('fileUrl', file.name);
        toast.success(`File "${file.name}" ready`);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Final validation check
        const mandatoryFields = ['printingPress', 'orderName', 'bagType', 'quantity', 'bagSize', 'bagColor', 'textColorType', 'textColorSelection', 'privacy'];
        if (formData.fileOption === 'Attach File Online') mandatoryFields.push('fileUrl');
        
        const newErrors = {};
        let isValid = true;
        mandatoryFields.forEach(field => {
            if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
                newErrors[field] = 'Required';
                isValid = false;
            }
        });

        if (!isValid) {
            setErrors(newErrors);
            toast.error('Please fill all required fields');
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            data.append('orderName', formData.orderName);
            data.append('orderType', formData.bagType);
            data.append('quantity', formData.quantity);
            data.append('bagSize', formData.bagSize);
            data.append('bagColor', formData.bagColor);
            data.append('textColors', JSON.stringify(formData.textColorSelection));
            data.append('colorType', formData.textColorType);
            data.append('privacy', formData.privacy);
            data.append('deliveryOption', formData.deliveryOption);
            data.append('fileOption', formData.fileOption);
            data.append('email', formData.fileOption === 'Send via Email' ? 'info@printersclub.in' : formData.email);
            data.append('applicableCost', costs.applicableCost);
            data.append('gst', costs.gst);
            data.append('totalAmount', costs.totalAmount);
            data.append('remark', formData.remark);
            data.append('bagCategory', 'Non-Woven Bag');
            data.append('bagName', 'D-Cut Bag');
            
            if (formData.file) {
                data.append('file', formData.file);
            }

            const response = await api.post('/orders', data);

            if (response.data.success) {
                if (response.data.walletBalance !== undefined) {
                    updateWalletBalance(response.data.walletBalance);
                }
                toast.success('Order placed successfully!');
                navigate('/associate/add-order');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-[Poppins] bg-[#f4f4f4] text-[#222] min-h-screen py-10">
            <div className="w-[1200px] max-w-[95%] mx-auto">
                
                <h1 className="text-center text-[20px] font-bold mb-10 tracking-widest uppercase">
                    ADD ORDER
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px]">
                    
                    {/* LEFT PANEL */}
                    <div className="w-full space-y-8">
                        
                        {/* Printing Press Selection */}
                        <div className="border border-[#d9d9d9] rounded-[10px] bg-white p-[20px] shadow-sm">
                            <div className="flex gap-[15px] items-center mb-4 flex-wrap">
                                <div className="text-[14px] font-semibold">Select 'Printing Press'</div>
                                <input 
                                    type="text" 
                                    placeholder="Search..."
                                    className="w-[180px] h-[38px] border border-[#d4d4d4] rounded-[5px] px-3 text-sm outline-none focus:border-[#1f73ff]"
                                />
                                <button className="bg-[#1f73ff] hover:bg-[#0d62f1] text-white rounded-[5px] px-4 py-[10px] text-[12px] font-bold transition-all">
                                    Add New Printing Press
                                </button>
                            </div>
                            <select 
                                name="printingPress"
                                value={formData.printingPress}
                                onChange={handleInputChange}
                                className={`w-full h-[42px] border rounded-[5px] px-4 text-sm outline-none bg-white ${errors.printingPress ? 'border-red-500' : 'border-[#d8d8d8]'}`}
                            >
                                <option value="">Select Printing Press...</option>
                                <option value="Direct Order">Direct Order</option>
                                <option value="Sandeep Printers">Sandeep Printers</option>
                            </select>
                            {errors.printingPress && <p className="text-red-500 text-xs mt-1">{errors.printingPress}</p>}
                        </div>

                        {/* Order Name */}
                        <div>
                            <div className="text-[16px] font-bold mb-3 uppercase tracking-wide">ORDER NAME</div>
                            <input 
                                type="text"
                                name="orderName"
                                placeholder="Type customer name here to check order status easily"
                                value={formData.orderName}
                                onChange={handleInputChange}
                                className={`w-full h-[45px] border rounded-[5px] px-4 text-sm outline-none focus:border-[#1f73ff] bg-white ${errors.orderName ? 'border-red-500' : 'border-[#d8d8d8]'}`}
                            />
                            {errors.orderName && <p className="text-red-500 text-xs mt-1">{errors.orderName}</p>}
                        </div>

                        {/* Select Detail Card */}
                        <div className="border border-[#d9d9d9] bg-white rounded-[8px] overflow-hidden shadow-sm">
                            <div className="p-4 border-b border-[#e6e6e6] text-[17px] font-bold text-[#12286e]">
                                SELECT DETAIL
                            </div>
                            
                            {/* Bag Type Row */}
                            <div className="flex items-center justify-between p-4 border-b border-[#ededed] flex-wrap gap-4">
                                <div className="flex items-center gap-3 w-[150px] font-semibold text-gray-700">
                                    <ShoppingBag size={18} className="text-[#1f73ff]" />
                                    Bag Type
                                </div>
                                <div className="flex-1">
                                    <select 
                                        name="bagType"
                                        value={formData.bagType}
                                        onChange={handleInputChange}
                                        className={`w-full h-[40px] border rounded-[5px] px-3 text-sm outline-none bg-white ${errors.bagType ? 'border-red-500' : 'border-[#d8d8d8]'}`}
                                    >
                                        <option value="">Select Bag Type...</option>
                                        <option value="One side">One side</option>
                                        <option value="Both sides">Both sides</option>
                                    </select>
                                    {errors.bagType && <p className="text-red-500 text-xs mt-1">{errors.bagType}</p>}
                                </div>
                            </div>

                            {/* Quantity Row */}
                            <div className="flex items-center justify-between p-4 border-b border-[#ededed] flex-wrap gap-4">
                                <div className="flex items-center gap-3 w-[150px] font-semibold text-gray-700">
                                    <FileText size={18} className="text-[#1f73ff]" />
                                    Quantity
                                </div>
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="flex flex-col flex-1">
                                        <input 
                                            type="number"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleInputChange}
                                            min="1000"
                                            className={`w-[100px] h-[40px] border rounded-[5px] px-3 text-center outline-none focus:border-[#1f73ff] ${errors.quantity ? 'border-red-500' : 'border-[#d8d8d8]'}`}
                                        />
                                        {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                                    </div>
                                    <span className="text-[#5f8dff] text-[13px]">(Min Qty. : 1000)</span>
                                </div>
                            </div>

                            {/* Bag Size Row */}
                            <div className="flex items-center justify-between p-4 border-b border-[#ededed] flex-wrap gap-4">
                                <div className="flex items-center gap-3 w-[150px] font-semibold text-gray-700">
                                    <Ruler size={18} className="text-[#1f73ff]" />
                                    Bag Size
                                </div>
                                <div className="flex-1">
                                    <select 
                                        name="bagSize"
                                        value={formData.bagSize}
                                        onChange={handleInputChange}
                                        className={`w-full h-[40px] border rounded-[5px] px-3 text-sm outline-none bg-white ${errors.bagSize ? 'border-red-500' : 'border-[#d8d8d8]'}`}
                                    >
                                        <option value="">Select Bag Size...</option>
                                        {bagSizes.map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                    {errors.bagSize && <p className="text-red-500 text-xs mt-1">{errors.bagSize}</p>}
                                </div>
                            </div>

                            {/* Bag Color Row */}
                            <div className="flex items-center justify-between p-4 border-b border-[#ededed] flex-wrap gap-4">
                                <div className="flex items-center gap-3 w-[150px] font-semibold text-gray-700">
                                    <Palette size={18} className="text-[#1f73ff]" />
                                    Bag Color
                                </div>
                                <div className="flex-1">
                                    <select 
                                        name="bagColor"
                                        value={formData.bagColor}
                                        onChange={handleInputChange}
                                        className={`w-full h-[40px] border rounded-[5px] px-3 text-sm outline-none bg-white ${errors.bagColor ? 'border-red-500' : 'border-[#d8d8d8]'}`}
                                    >
                                        <option value="">Select Bag Color...</option>
                                        {bagColors.map(color => (
                                            <option key={color} value={color}>{color}</option>
                                        ))}
                                    </select>
                                    {errors.bagColor && <p className="text-red-500 text-xs mt-1">{errors.bagColor}</p>}
                                </div>
                            </div>

                            {/* Text Color Type Row */}
                            <div className="flex items-center justify-between p-4 border-b border-[#ededed] flex-wrap gap-4">
                                <div className="flex items-center gap-3 w-[150px] font-semibold text-gray-700">
                                    <Palette size={18} className="text-[#1f73ff]" />
                                    Text Color Type
                                </div>
                                <div className="flex-1">
                                    <select 
                                        name="textColorType"
                                        value={formData.textColorType}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                            setFormData(prev => ({ ...prev, textColorSelection: [] }));
                                        }}
                                        className={`w-full h-[40px] border rounded-[5px] px-3 text-sm outline-none bg-white ${errors.textColorType ? 'border-red-500' : 'border-[#d8d8d8]'}`}
                                    >
                                        <option value="">Select Text Color Type...</option>
                                        {textColorTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    {errors.textColorType && <p className="text-red-500 text-xs mt-1">{errors.textColorType}</p>}
                                </div>
                            </div>

                            {/* Text Color Selection Row */}
                            <div className="flex items-start justify-between p-4 border-b border-[#ededed] flex-wrap gap-4">
                                <div className="flex items-center gap-3 w-[150px] font-semibold text-gray-700 mt-2">
                                    <Palette size={18} className="text-[#1f73ff]" />
                                    Text Color Selection
                                </div>
                                <div className="flex-1">
                                    <div className={`flex flex-wrap gap-2 p-2 border rounded-lg ${errors.textColorSelection ? 'border-red-500' : 'border-transparent'}`}>
                                        {textColorOptions.map(color => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => handleColorSelect(color)}
                                                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                                                    formData.textColorSelection.includes(color)
                                                        ? 'bg-[#1f73ff] text-white border-[#1f73ff] shadow-sm'
                                                        : 'bg-white text-gray-500 border-gray-200 hover:border-[#1f73ff] hover:text-[#1f73ff]'
                                                }`}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.textColorSelection && <p className="text-red-500 text-xs mt-1">{errors.textColorSelection}</p>}
                                    <div className="mt-2 text-[11px] font-bold text-gray-400">
                                        {formData.textColorType === 'Single color' && "Select any one color"}
                                        {formData.textColorType === 'Two color' && "Select any two colors"}
                                        {formData.textColorType === 'Multi color' && "Select multiple colors"}
                                    </div>
                                </div>
                            </div>

                            {/* Privacy Packing Section */}
                            <div className={`p-4 border-b border-[#ededed] ${errors.privacy ? 'bg-red-50' : ''}`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-[15px] font-bold text-[#12286e]">PRIVACY PACKING</div>
                                    {formData.privacy === 'Required' && (
                                        <span className="text-[11px] text-[#1f73ff] font-bold animate-pulse">
                                            (+ Rs. 100/- Privacy Charge)
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-10">
                                    <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="privacy" 
                                            value="Required"
                                            checked={formData.privacy === 'Required'}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-[#1f73ff]"
                                        />
                                        <AlertCircle size={14} className="text-[#1f73ff]" />
                                        Required
                                    </label>
                                    <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="privacy" 
                                            value="Not Required"
                                            checked={formData.privacy === 'Not Required'}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-[#1f73ff]"
                                        />
                                        <AlertCircle size={14} className="text-[#1f73ff]" />
                                        Not Required
                                    </label>
                                </div>
                                {errors.privacy && <p className="text-red-500 text-xs mt-1">{errors.privacy}</p>}
                            </div>

                            {/* Delivery Option Section */}
                            <div className="p-4 border-b border-[#ededed]">
                                <div className="text-[15px] font-bold mb-4 text-[#12286e]">SELECT DELIVERY OPTION</div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-[#1f73ff] cursor-pointer">
                                    <input 
                                        type="radio" 
                                        checked 
                                        readOnly 
                                        className="w-4 h-4"
                                    />
                                    <Truck size={16} />
                                    Dispatch By Transport
                                </label>
                                <p className="text-[10px] text-gray-400 mt-2 ml-6 font-medium italic">Transport Charges extra as per bilty amount</p>
                            </div>

                            {/* File Option Section */}
                            <div className="p-4 border-b border-[#ededed]">
                                <div className="text-[15px] font-bold mb-4 text-[#12286e]">SELECT FILE OPTION</div>
                                <div className="flex gap-10 mb-6">
                                    <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="fileOption" 
                                            value="Attach File Online"
                                            checked={formData.fileOption === 'Attach File Online'}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-[#1f73ff]"
                                        />
                                        <Upload size={16} className="text-[#1f73ff]" />
                                        Attach File Online
                                    </label>
                                    <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="fileOption" 
                                            value="Send via Email"
                                            checked={formData.fileOption === 'Send via Email'}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-[#1f73ff]"
                                        />
                                        <Mail size={16} className="text-[#1f73ff]" />
                                        Send via Email
                                    </label>
                                </div>

                                {formData.fileOption === 'Attach File Online' && (
                                    <div className="space-y-4">
                                        {/* Instructions Box */}
                                        <div className="border border-emerald-100 bg-emerald-50/30 rounded-2xl p-5 text-[13px] leading-relaxed text-slate-700">
                                            <div className="mb-2">
                                                <span className="font-bold">Allowed Formats:</span> PDF, CDR, PSD, JPEG, PNG
                                            </div>
                                            <div className="mb-4">
                                                <span className="font-bold">Discount Offer:</span> Enjoy ₹10 off when you upload your file in PDF format.
                                            </div>
                                            
                                            <div className="space-y-1">
                                                <div className="font-bold mb-1 text-slate-800">Instructions for PDF Files:</div>
                                                <ul className="list-disc pl-5 space-y-1">
                                                    <li>Total Design Size: <span className="font-bold text-[#1f73ff]">90 × 54 mm</span></li>
                                                    <li>Final Size (after trimming): <span className="font-bold text-[#1f73ff]">87 × 51 mm</span></li>
                                                    <li>Safe Area (Text Area): <span className="font-bold text-[#1f73ff]">81 × 45 mm</span></li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Select File Option */}
                                        <div className={`flex items-center justify-between p-4 border rounded-xl bg-white shadow-sm ${errors.fileUrl ? 'border-red-500 bg-red-50' : 'border-[#ededed]'}`}>
                                            <div className="flex items-center gap-3 font-semibold text-gray-700">
                                                <FileText size={18} className="text-[#1f73ff]" />
                                                Select File
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {formData.fileUrl && (
                                                    <span className="text-[12px] font-medium text-emerald-600 flex items-center gap-1">
                                                        <CheckCircle size={14} />
                                                        {formData.fileUrl}
                                                    </span>
                                                )}
                                                <button 
                                                    type="button"
                                                    onClick={() => document.getElementById('file-upload').click()}
                                                    className="bg-[#1f73ff] hover:bg-[#0d62f1] text-white rounded-[5px] px-6 py-2 text-[12px] font-bold transition-all"
                                                >
                                                    {formData.fileUrl ? 'Change File' : 'Browse'}
                                                </button>
                                            </div>
                                        </div>
                                        {errors.fileUrl && <p className="text-red-500 text-xs mt-1">{errors.fileUrl}</p>}

                                        {/* Drag & Drop Area */}
                                        <div 
                                            className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer group
                                                ${dragActive ? 'border-[#1f73ff] bg-blue-50' : errors.fileUrl ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                                            onDragEnter={handleDrag}
                                            onDragLeave={handleDrag}
                                            onDragOver={handleDrag}
                                            onDrop={handleDrop}
                                            onClick={() => document.getElementById('file-upload').click()}
                                        >
                                            <input 
                                                id="file-upload"
                                                type="file" 
                                                className="hidden"
                                                onChange={handleFileChange}
                                                accept=".pdf,.cdr,.psd,.jpeg,.jpg,.png"
                                            />
                                            
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-14 h-14 bg-[#1f73ff] text-white flex items-center justify-center rounded-2xl shadow-lg shadow-blue-200 mb-2">
                                                    <Upload size={28} />
                                                </div>
                                                
                                                <h3 className="text-[18px] font-bold text-slate-800">
                                                    {formData.fileUrl ? `Selected: ${formData.fileName || formData.fileUrl}` : "Drag & Drop file here"}
                                                </h3>
                                                
                                                <p className="text-[14px] font-medium text-slate-500">
                                                    or <span className="text-[#1f73ff] underline">Click to Browse</span>
                                                </p>
                                                
                                                <p className="text-[12px] font-bold text-slate-600 mt-2">
                                                    Supports PDF, CDR, PSD, JPG, PNG <span className="text-red-500">(Max 100MB)</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {formData.fileOption === 'Send via Email' && (
                                    <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100 space-y-3">
                                        <div className="flex items-center gap-2 text-blue-800 font-bold text-xs uppercase">
                                            <Mail size={14} />
                                            Company Email Detail
                                        </div>
                                        <input 
                                            type="email"
                                            value="info@printersclub.in"
                                            readOnly
                                            className="w-full h-10 border border-blue-200 rounded-lg px-4 text-sm font-bold text-blue-900 bg-white outline-none"
                                        />
                                        <p className="text-[10px] text-blue-600 font-bold tracking-tight">
                                            * Note: Sending files via email incurs an additional Rs. 100/- processing fee.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Pricing Details */}
                            <div className="px-4 py-2 space-y-3">
                                <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                                    <div className="flex flex-col">
                                        <span>Applicable Cost</span>
                                        <span className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter">(30% Member Discount Applied)</span>
                                    </div>
                                    <span>Rs. <b className="text-black">{costs.applicableCost.toFixed(0)}/-</b></span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                                    <span>GST (18.00%)</span>
                                    <span>Rs. <b className="text-black">{costs.gst.toFixed(0)}/-</b></span>
                                </div>
                                <div className="flex justify-between items-center text-[16px] font-bold text-[#12286e]">
                                    <span>Amount Payable</span>
                                    <span className="text-[#1f73ff]">Rs. {costs.totalAmount.toFixed(0)}/-</span>
                                </div>
                                
                                {/* Selling Price Input */}
                                <div className="flex justify-between items-center py-2 border-t border-[#ededed] mt-2">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-700">Selling Price</span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">(Actual Price)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="number"
                                            name="sellingPrice"
                                            value={formData.sellingPrice}
                                            readOnly
                                            className="w-[80px] h-[35px] border border-[#d8d8d8] rounded-[5px] px-2 text-sm text-right outline-none bg-gray-50 text-gray-600 font-bold"
                                        />
                                        <span className="text-sm font-bold">Rs.</span>
                                    </div>
                                </div>

                                {/* Special Remark */}
                                <div className="py-2">
                                    <div className="text-[13px] font-bold mb-2 text-gray-700">Special Remark (Optional)</div>
                                    <textarea 
                                        name="remark"
                                        value={formData.remark}
                                        onChange={handleInputChange}
                                        placeholder="remarks for order processing team..."
                                        className="w-full h-[80px] border border-[#d8d8d8] rounded-[5px] p-3 text-sm outline-none focus:border-[#1f73ff] bg-gray-50 resize-none"
                                    />
                                </div>

                                {/* Pressline Input */}
                                <div className="flex items-center justify-between py-4 border-t border-[#ededed]">
                                    <div className="text-[10px] leading-tight">
                                        <span className="block font-bold">Enter Pressline :</span>
                                        <span className="text-red-500 font-bold">To be Printed on Free Gift (Card Holder)</span>
                                    </div>
                                    <input 
                                        type="text"
                                        name="pressline"
                                        value={formData.pressline}
                                        onChange={handleInputChange}
                                        className="w-[200px] h-[38px] border border-[#d8d8d8] rounded-[5px] px-3 text-sm outline-none focus:border-[#1f73ff]"
                                    />
                                </div>
                            </div>

                            {/* Final Add Order Button */}
                            <div className="p-4 pt-0">
                                <button 
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full h-[52px] bg-[#1f73ff] hover:bg-[#005de6] text-white rounded-[10px] text-[17px] font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-3"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <Wallet size={20} />}
                                    Add Order (Pay From Wallet)
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="lg:sticky lg:top-10 h-fit border-l-[4px] border-[#1f73ff] pl-10 space-y-10">
                        
                        {/* Product Image Carousel Placeholder */}
                        <div className="bg-white rounded-[20px] shadow-lg border border-gray-100 p-4 relative group">
                            <div className="absolute top-6 left-6 w-[55px] h-[55px] bg-[#6fc400] text-white flex items-center justify-center rounded-full font-bold text-[14px] shadow-md transform -rotate-12 z-10">
                                VC-15
                            </div>
                            <img 
                                src={D_cut} 
                                alt="Product" 
                                className="w-full aspect-[4/3] object-contain rounded-[15px]"
                            />
                            {/* Carousel Dots */}
                            <div className="flex justify-center gap-2 mt-4">
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-[#1f73ff]"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                            </div>
                        </div>

                        {/* Product Details Section */}
                        <div className="space-y-10">
                            
                            {/* Product Description */}
                            <section>
                                <h3 className="text-[19px] font-bold text-[#12286e] mb-5 underline underline-offset-8 decoration-2 decoration-[#1f73ff]/30 flex items-center gap-2">
                                    Product Description
                                </h3>
                                <ul className="space-y-3 pl-2">
                                    <li className="flex items-start gap-3 text-[14px] text-gray-600 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-[#1f73ff] mt-[6px]"></div>
                                        <span>Product Ref. : <b className="text-[#12286e]">VC/11th Edition (Sample File)</b></span>
                                    </li>
                                    <li className="flex items-start gap-3 text-[14px] text-gray-600 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-[#1f73ff] mt-[6px]"></div>
                                        <span>Product Code : <b className="text-[#12286e]">VC-20</b></span>
                                    </li>
                                    <li className="flex items-start gap-3 text-[14px] text-gray-600 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-[#1f73ff] mt-[6px]"></div>
                                        <span>Product Class : <b className="text-[#12286e]">Regular</b></span>
                                    </li>
                                    <li className="flex items-start gap-3 text-[14px] text-gray-600 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-[#1f73ff] mt-[6px]"></div>
                                        <span>Product Core : <b className="text-[#12286e]">Excellent printing (No Gloss coating)</b></span>
                                    </li>
                                    <li className="flex items-start gap-3 text-[14px] text-gray-600 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-[#1f73ff] mt-[6px]"></div>
                                        <span>Production Time : <b className="text-[#12286e]">2 days</b></span>
                                    </li>
                                    <li className="flex items-start gap-3 text-[14px] text-gray-600 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-[#1f73ff] mt-[6px]"></div>
                                        <span>Lamination Type : <b className="text-[#12286e]">N/A</b></span>
                                    </li>
                                </ul>
                            </section>

                            {/* Our Specialization */}
                            <section>
                                <h3 className="text-[19px] font-bold text-[#12286e] mb-5 underline underline-offset-8 decoration-2 decoration-[#1f73ff]/30 flex items-center gap-2">
                                    Our Specialization
                                </h3>
                                <ul className="space-y-3 pl-2">
                                    {[
                                        "We are India's No. 1 Visiting card manufacturer",
                                        "Printing with latest Komori offset machines (2023 Model)",
                                        "Innovative, Advanced & Equipped Post Printing Unit",
                                        "Constant quality with reasonable price"
                                    ].map((spec, i) => (
                                        <li key={i} className="flex items-start gap-3 text-[14px] text-gray-600 font-medium">
                                            <div className="w-2 h-2 rounded-full bg-[#1f73ff] mt-[6px]"></div>
                                            {spec}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Points to Note */}
                            <section>
                                <h3 className="text-[19px] font-bold text-[#12286e] mb-5 underline underline-offset-8 decoration-2 decoration-[#1f73ff]/30 flex items-center gap-2">
                                    Points to be Noted
                                </h3>
                                <div className="space-y-4 pl-2">
                                    <div className="text-[14px] font-bold text-gray-600 flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-[#1f73ff] mt-[6px]"></div>
                                        <div>
                                            Size Must be as below:
                                            <div className="mt-3 space-y-1 ml-4 text-[13px] font-bold">
                                                <div className="flex gap-4">
                                                    <span className="w-[150px]">Card Design Size :</span>
                                                    <span className="text-red-600">W: 90.00 mm X H: 54.00 mm</span>
                                                </div>
                                                <div className="flex gap-4">
                                                    <span className="w-[150px]">Text / Matter Area :</span>
                                                    <span className="text-red-600">W: 80.00 mm X H: 44.00 mm</span>
                                                </div>
                                                <div className="flex gap-4">
                                                    <span className="w-[150px]">Size After Cutting :</span>
                                                    <span className="text-red-600">W: 87.00 mm X H: 51.00 mm</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="space-y-4">
                                        {[
                                            "The color saturation and print quality on these cards is extremely high, great for more colorful or darker designs.",
                                            "Use high-resolution imagery for the clearest & sharpest results."
                                        ].map((note, i) => (
                                            <li key={i} className="flex items-start gap-3 text-[13px] text-gray-500 font-medium italic">
                                                <div className="w-2 h-2 rounded-full bg-[#1f73ff] mt-[6px]"></div>
                                                {note}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DCutBagOrder;
