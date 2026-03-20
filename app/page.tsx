"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Facebook, Search, ArrowLeft, CheckCircle2, Globe, Shield, Leaf, X, Download, Info, Instagram } from "lucide-react";

export default function AyraGlobalElite() {
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [view, setView] = useState<'home' | 'products' | 'admin-login' | 'admin-dashboard'>('home');
  const [adminTab, setAdminTab] = useState<'products' | 'enquiry' | 'settings'>('products');
  const [businessName, setBusinessName] = useState("Ayra Global Elite");
  const [businessPhone, setBusinessPhone] = useState("+91 87667 95070");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [formProduct, setFormProduct] = useState({
    name: "", cat: "Dehydrated Ingredients", img: "", description: "",
    specs: { "Origin": "", "Moisture": "", "Grade": "", "Shelf Life": "" }
  });

  // 1. Load products from browser memory on startup
React.useEffect(() => {
  const saved = localStorage.getItem('ayra_inventory');
  if (saved) setProductList(JSON.parse(saved));
}, []);

// 2. Save products to browser memory every time the list changes
React.useEffect(() => {
  localStorage.setItem('ayra_inventory', JSON.stringify(productList));
 [productList]});


   const products = [
    { 
      name: "Onion Powder", 
      cat: "Dehydrated Ingredients", 
      img: "/onion powder.PNG", // Ensure this file is in your public folder
      description: "Premium dehydrated Red Globe onion powder. Processed to maintain high pungency and natural flavor profile.",
      specs: { "Origin": "Maharashtra", "Moisture": "5% Max", "Grade": "Premium A", "Shelf Life": "12 Months" }
    },
    { 
      name: "Ginger Powder", 
      cat: "Dehydrated Ingredients", 
      img: "/ginger powder.PNG", 
      description: "Aromatic and sharp Ginger powder sourced from the fertile lands of Kerala. Fiberless and 100% natural.",
      specs: { "Origin": "Kerala, India", "Moisture": "7% Max", "Grade": "Bold Export", "Shelf Life": "18 Months" }
    },
    { 
      name: "Garlic Powder", 
      cat: "Dehydrated Ingredients", 
      img: "/garlic powder.PNG", 
      description: "Strongly pungent Garlic powder, ideal for industrial food seasoning and gourmet cooking.",
      specs: { "Origin": "Gujarat, India", "Moisture": "6% Max", "Grade": "High Pungency", "Shelf Life": "12 Months" }
    },
    { 
      name: "Banana Powder", 
      cat: "Fruit Powders", 
      img: "/banana powder.PNG", 
      description: "Natural Banana powder made from ripe Cavendish bananas. Excellent for health supplements.",
      specs: { "Origin": "Tamil Nadu", "Moisture": "5% Max", "Grade": "Pure Natural", "Shelf Life": "9 Months" }
    },
    { 
      name: "Moringa Powder", 
      cat: "Organic Superfoods", 
      img: "/moringa powder.PNG", 
      description: "Nutrient-dense 100% Organic Moringa leaf powder. Shadow-dried to preserve vibrant quality.",
      specs: { "Origin": "Rajasthan", "Purity": "100% Organic", "Moisture": "8% Max", "Shelf Life": "24 Months" }
    },
    { 
      name: "Beetroot Powder", 
      cat: "Health & Wellness", 
      img: "/beetroot powder.PNG", 
      description: "Vibrant and nutrient-rich Beetroot powder. Perfect for natural food coloring and supplements.",
      specs: { "Origin": "Maharashtra", "Moisture": "6% Max", "Grade": "A Grade", "Shelf Life": "12 Months" }
    },
    { 
      name: "Bottle Gourd Powder", 
      cat: "Health & Wellness", 
      img: "/Bottle Guard Powder.PNG", 
      description: "Premium Bottle Gourd (Lauki) powder. Highly valued for its cooling properties and dietary benefits.",
      specs: { "Origin": "Maharashtra", "Moisture": "7% Max", "Purity": "100% Pure", "Shelf Life": "12 Months" }
    }
  ];

  


  const handleOpenAdd = () => {
    setEditingProduct(null);
    // Clear the form for a brand new product
    setFormData({ 
      name: "", 
      cat: "Dehydrated Ingredients", 
      img: null, 
      description: "", 
      specs: { "Origin": "", "Moisture": "", "Grade": "", "Shelf Life": "" } 
    });
    setIsEditorOpen(true); // Matches your full-screen AnimatePresence
  };

  const handleOpenEdit = (p: any) => {
    setEditingProduct(p);
    // Load existing product data into the form
    setFormData(p);
    setIsEditorOpen(true); // Matches your full-screen AnimatePresence
  };
  // 1. Change your products to a state
  const [productList, setProductList] = useState(products); 
  
  // 2. State for the Full-Screen "New Window" Overlay
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    name: "", cat: "Dehydrated Ingredients", img: "", description: "",
    specs: { "Origin": "", "Moisture": "", "Grade": "", "Shelf Life": "" }
  });

  // 3. Logic for Save / Publish
  const handleAction = () => {
  if (editingProduct) {
    // Edit Logic: Finds the product by its original name and swaps in the new formData
    setProductList(prev => prev.map(p => 
      p.name === editingProduct.name ? formData : p
    ));
  } else {
    // Publish Logic: Adds the new formData as a fresh entry at the top of the list
    setProductList(prev => [formData, ...prev]);
  }

  // 1. Close the full-screen window
  setIsEditorOpen(false);
  
  // 2. Clear the edit state
  setEditingProduct(null);

  // 3. Reset formData so the "Add" screen is blank next time
  setFormData({
    name: "", 
    cat: "Dehydrated Ingredients", 
    img: null, 
    description: "", 
    specs: { "Origin": "", "Moisture": "", "Grade": "", "Shelf Life": "" }
  });
};

  const filteredProducts = productList.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-[#002B5B] font-sans">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed w-full top-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 px-8 md:px-16 py-2 flex justify-between items-center shadow-sm">
        <div className="cursor-pointer" onClick={() => setView('home')}>
          <img src="/logooo.jpeg" alt="Ayra Logo" className="h-24 md:h-28 w-auto object-contain" />
        </div>
        <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em] items-center text-[#002B5B]">
          <button onClick={() => setView('home')} className="hover:text-[#C5A059] transition-all">Home</button>
          <a href="#about" className="hover:text-[#C5A059] transition-all">About Us</a>
          <button onClick={() => setView('products')} className="hover:text-[#C5A059] transition-all">Products</button>
          <a href="#contact" className="hover:text-[#C5A059] transition-all">Contact Us</a>
        </div>
      </nav>
<AnimatePresence mode="wait">
        {/* --- 1. HOME VIEW (Your Original Logic) --- */}
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* HERO SECTION */}
            <section className="relative h-screen flex items-center bg-[#F4F9F4] pt-20 overflow-hidden">
              <div className="container mx-auto px-12 lg:px-24 grid lg:grid-cols-2 gap-16 items-center">
                <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                  <span className="text-[#C5A059] bg-[#C5A059]/10 px-4 py-1 font-bold uppercase tracking-[0.4em] text-[11px] mb-6 inline-block">Premium Merchant Exporters</span>
                  <h1 className="text-[#002B5B] font-serif text-6xl lg:text-8xl leading-[0.9] mb-8 italic">Pure Indian <br/><span className="text-[#C5A059] not-italic">Elite Quality.</span></h1>
                  <p className="text-gray-600 text-lg max-w-md leading-relaxed mb-10 font-light">Sourcing high-quality dehydrated ingredients from certified manufacturers for the global food industry.</p>
                  <div className="flex gap-4">
                    <button onClick={() => setView('products')} className="bg-[#002B5B] text-white px-10 py-4 font-bold tracking-widest hover:bg-[#C5A059] transition-all rounded-sm shadow-xl">VIEW CATALOGUE</button>
                    <a href="#contact" className="border-2 border-[#002B5B] text-[#002B5B] px-10 py-4 font-bold tracking-widest hover:bg-[#002B5B] hover:text-white transition-all rounded-sm uppercase text-xs flex items-center">Enquiry</a>
                  </div>
                </motion.div>
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="hidden lg:block relative group">
                  <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-[#C5A059] z-0" /><div className="relative border-[12px] border-white shadow-2xl rounded-sm overflow-hidden bg-white">
                    <img src="/heroo.jpeg" alt="Hero" className="w-full h-auto max-h-[550px] object-contain block mx-auto transition-transform duration-[2000ms] group-hover:scale-105" />
                  </div><div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-[#C5A059] z-0" />
                </motion.div>
              </div>
            </section>

            {/* SHOP BY COLLECTION */}
            <section className="py-24 bg-white px-12">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16"><h4 className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px] mb-4">The Elite Selection</h4><h2 className="text-4xl font-serif text-[#002B5B]">Shop by Collection</h2></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[{ name: "Dehydrated Ingredients", img: "/ginger powder.PNG", desc: "Ginger & Garlic" }, { name: "Fruit Powders", img: "/banana powder.PNG", desc: "Banana Powder" }, { name: "Organic Superfoods", img: "/moringa powder.PNG", desc: "Moringa Powder" }, { name: "Health & Wellness", img: "/beetroot powder.PNG", desc: "Beetroot & Bottle Gourd" }].map((cat, i) => (
                    <motion.div key={i} onClick={() => setView('products')} whileHover={{ y: -10 }} className="relative h-[450px] group overflow-hidden cursor-pointer shadow-xl rounded-sm border border-gray-100">
                      <img src={cat.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={cat.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#002B5B]/90 via-[#002B5B]/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 transition-transform duration-500 text-left">
                        <span className="text-[#C5A059] text-[9px] font-bold uppercase tracking-[0.3em] mb-2 block">{cat.desc}</span><h3 className="text-white text-2xl font-serif mb-4">{cat.name}</h3><div className="h-[2px] w-8 bg-[#C5A059] group-hover:w-full transition-all duration-700" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="py-24 px-12 bg-[#002B5B] text-white text-center">
              <h2 className="text-4xl font-serif text-[#C5A059] mb-16">Why Choose Us?</h2>
              <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                {[{ icon: <Shield />, title: "Premium Standards", text: "ISO & Quality Certified" }, { icon: <Leaf />, title: "Naturally Sourced", text: "Pure Farm Ingredients" }, { icon: <Globe />, title: "Global Support", text: "Export Documentation" }, { icon: <CheckCircle2 />, title: "Customized", text: "Tailored Bulk Solutions" }].map((item, i) => (
                  <div key={i} className="flex flex-col items-center group">
                    <div className="text-[#C5A059] mb-6 group-hover:scale-110 transition-transform">{item.icon}</div><h4 className="font-bold text-sm mb-4">{item.title}</h4><p className="text-xs text-gray-400">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ABOUT US */}
            <section id="about" className="py-32 bg-[#F9FBF9] px-12 text-left">
              <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative group">
                  <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-[#C5A059] z-0" /><div className="relative border-[15px] border-white shadow-2xl overflow-hidden rounded-sm bg-white">
                    <img src="/about us.jpg" className="w-full h-auto max-h-[600px] object-contain transition-transform duration-1000 group-hover:scale-105" alt="About" />
                  </div><div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-[#C5A059] z-0" />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-xs mb-4">Our Heritage</h4><h2 className="text-5xl font-serif text-[#002B5B] mb-8 leading-tight">Elite Ingredients <br/>For Global Markets.</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light">Ayra Global Elite specializes in high-quality dehydrated food ingredients. We bridge the gap between reliable Indian manufacturers and international buyers.</p>
                  <div className="grid grid-cols-2 gap-8 text-[11px] font-bold tracking-widest text-[#002B5B] uppercase">
                     <span className="flex items-center gap-2 border-l-2 border-[#C5A059] pl-4"><CheckCircle2 size={16} className="text-[#C5A059]"/> Quality Standards</span><span className="flex items-center gap-2 border-l-2 border-[#C5A059] pl-4"><Globe size={16} className="text-[#C5A059]"/> Global Logistics</span>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* CONTACT US */}
            <section id="contact" className="py-24 px-12 bg-[#F9FBF9] text-left">
              <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
                <div><h2 className="text-4xl font-serif mb-10 text-[#002B5B]">Get In Touch</h2><div className="space-y-8"><div className="flex gap-4"><MapPin className="text-[#C5A059]"/><p className="text-sm">Keshavnagar, Mundhwa, Pune - 411036</p></div><div className="flex gap-4"><Phone className="text-[#C5A059]"/><p className="text-sm">{businessPhone}</p></div><div className="flex gap-4"><Mail className="text-[#C5A059]"/><p className="text-sm">info.ayraglobalelite@gmail.com</p></div></div></div>
                <form className="space-y-6 bg-white p-10 rounded-sm shadow-xl border border-gray-100">
                  <h3 className="text-xl font-serif mb-4 text-left">Direct Enquiry</h3><input type="text" placeholder="Full Name" className="w-full border-b border-gray-200 py-3 outline-none focus:border-[#C5A059] bg-transparent" /><input type="email" placeholder="Email Id" className="w-full border-b border-gray-200 py-3 outline-none focus:border-[#C5A059] bg-transparent" /><textarea placeholder="Your Requirement" className="w-full border-b border-gray-200 py-3 outline-none focus:border-[#C5A059] bg-transparent" /><button className="w-full bg-[#002B5B] text-white py-4 font-bold tracking-widest hover:bg-[#C5A059] transition-all">SEND MESSAGE</button>
                </form>
              </div>
            </section>
          </motion.div>
        )}

        {/* --- 2. PRODUCT CATALOGUE PAGE (Your Original Logic) --- */}
        {view === 'products' && (
          <motion.div key="products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 px-12 max-w-7xl mx-auto pb-32 text-left">
            <button onClick={() => setView('home')} className="flex items-center gap-2 text-[#C5A059] font-bold mb-12 uppercase text-[10px] tracking-widest"><ArrowLeft size={16}/> Back Home</button>
            <div className="flex justify-between items-end mb-16 border-b border-gray-100 pb-8">
              <h2 className="text-5xl font-serif text-[#002B5B]">Our Collection</h2>
              <div className="relative w-80"><input type="text" placeholder="Search ingredients..." className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#C5A059]" onChange={(e) => setSearch(e.target.value)} /><Search className="absolute right-0 top-2 text-gray-300" size={18} /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {filteredProducts.map((p, i) => (
                <div key={i} className="group cursor-pointer" onClick={() => setSelectedProduct(p)}>
                  <div className="h-72 overflow-hidden mb-6 shadow-md rounded-sm border-[8px] border-white bg-white flex items-center justify-center"><img src={p.img} className="max-w-full max-h-full object-contain transition-transform group-hover:scale-110" alt={p.name} /></div>
                  <h3 className="text-xl font-serif mb-2 text-[#002B5B]">{p.name}</h3><span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest flex items-center gap-2">View Details <Info size={12}/></span>
                </div>
              ))}
            </div>

            {/* MODAL INSIDE PRODUCTS */}
            <AnimatePresence>
              {selectedProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#002B5B]/80 backdrop-blur-sm">
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-5xl h-[600px] rounded-sm overflow-hidden grid md:grid-cols-2 relative shadow-2xl text-left">
                    <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full text-[#002B5B] hover:bg-[#C5A059] transition-all"><X size={20}/></button>
                    <div className="h-full bg-gray-50 flex items-center justify-center p-8"><img src={selectedProduct.img} className="max-h-full max-w-full object-contain" alt={selectedProduct.name} /></div>
                    <div className="p-10 md:p-16 flex flex-col h-[600px] overflow-hidden">
                      <div className="mb-6"><span className="text-[#C5A059] font-bold uppercase tracking-widest text-[10px] mb-2 block">{selectedProduct.cat}</span><h2 className="text-4xl font-serif text-[#002B5B] leading-tight">{selectedProduct.name}</h2></div>
                      <div className="flex-grow overflow-y-scroll pr-4 custom-scrollbar h-[300px]">
                        <p className="text-gray-500 text-sm leading-relaxed mb-8 pt-2">{selectedProduct.description}</p>
                        <div className="space-y-4 pb-4">
                          <h4 className="text-[10px] font-bold text-[#002B5B] uppercase tracking-[0.2em] mb-4 border-b border-gray-100 pb-2">Technical Specifications</h4>
                          {Object.entries(selectedProduct.specs).map(([k, v]) => (
                            <div key={k} className="flex justify-between border-b border-gray-50 py-2"><span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">{k}</span><span className="text-sm font-bold text-[#002B5B]">{v as string}</span></div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100 bg-white">
                        <button className="flex-1 bg-[#002B5B] text-white py-4 font-bold tracking-widest text-[10px] uppercase hover:bg-[#C5A059] transition-all flex items-center justify-center gap-2">Request Quote <Mail size={14}/></button>
                        <button className="px-6 border border-[#002B5B] text-[#002B5B] hover:bg-[#002B5B] hover:text-white transition-all"><Download size={18}/></button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* --- 3. ADMIN LOGIN VIEW --- */}
       {/* --- ADMIN LOGIN VIEW (Premium Minimalist) --- */}
{view === 'admin-login' && (
  <motion.div key="admin-login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen fixed inset-0 z-[150] flex items-center justify-center bg-[#FDFDFD]">
    <div className="w-full max-w-sm px-8">
      <div className="text-center mb-12">
        <img src="/logooo.jpeg" className="h-16 mx-auto mb-8 grayscale hover:grayscale-0 transition-all duration-700" alt="Logo" />
        <h2 className="text-[10px] font-bold tracking-[0.5em] text-[#C5A059] uppercase">LOGIN</h2>
      </div>
      <div className="space-y-8">
        <div className="group">
          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-2">username</label>
          <input type="text" className="w-full border-b border-gray-200 py-2 outline-none focus:border-[#002B5B] transition-colors bg-transparent font-light" placeholder="Username" />
        </div>
        <div className="group">
          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-2">password</label>
          <input type="password" className="w-full border-b border-gray-200 py-2 outline-none focus:border-[#002B5B] transition-colors bg-transparent font-light" placeholder="••••••••" />
        </div>
        <button onClick={() => setView('admin-dashboard')} className="w-full bg-[#002B5B] text-white py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#C5A059] transition-all duration-500 shadow-2xl">
          LOGIN
        </button>
        <button onClick={() => setView('home')} className="w-full text-gray-300 text-[9px] font-bold tracking-[0.2em] uppercase hover:text-[#002B5B] transition-colors">
          Return to Storefront
        </button>
      </div>
    </div>
  </motion.div>
)}

        {/* --- 4. ADMIN DASHBOARD VIEW (With Sidebar & Settings) --- */}
        {view === 'admin-dashboard' && (
          <motion.div key="admin-dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-screen bg-gray-50 overflow-hidden fixed inset-0 z-[200]">
            <aside className="w-80 bg-white border-r border-gray-100 flex flex-col p-10 z-[200]">
  <div className="mb-20">
    <img src="/logooo.jpeg" className="h-12 mb-6" alt="Logo" />
    <div className="h-[1px] w-12 bg-[#C5A059]" />
  </div>

  <nav className="flex-grow space-y-10">
    {[
      { id: 'products', label: 'Inventory', icon: <Leaf size={18} strokeWidth={1} /> },
      { id: 'enquiry', label: 'Enquiries', icon: <Mail size={18} strokeWidth={1} /> },
      { id: 'settings', label: 'Brand Settings', icon: <Shield size={18} strokeWidth={1} /> },
    ].map((item) => (
      <button 
        key={item.id} 
        onClick={() => setAdminTab(item.id as any)}
        className={`w-full flex items-center gap-6 text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-500 ${adminTab === item.id ? 'text-[#C5A059] translate-x-2' : 'text-gray-300 hover:text-[#002B5B]'}`}
      >
        <span className={`${adminTab === item.id ? 'opacity-100' : 'opacity-0'} transition-opacity`}>•</span>
        {item.icon} {item.label}
      </button>
    ))}
  </nav>

  <div className="pt-10 border-t border-gray-50 space-y-6">
    <button onClick={() => setView('home')} className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-[#002B5B] transition-all">
      <Globe size={16} strokeWidth={1} /> view store
    </button>
    <button onClick={() => setView('home')} className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-red-300 hover:text-red-500 transition-all">
      <X size={16} strokeWidth={1} /> Log out
    </button>
  </div>
</aside>
            <main className="flex-grow p-12 overflow-y-auto text-left">
              <header className="flex justify-between items-end mb-12 border-b border-gray-200 pb-8"><div><h1 className="text-4xl font-serif text-[#002B5B] capitalize">{adminTab}</h1><p className="text-xs text-gray-400 mt-2 tracking-widest uppercase font-bold">Admin / {adminTab}</p></div></header>
              {adminTab === 'settings' && (
                <div className="max-w-2xl space-y-12">
                  <div className="bg-white p-8 shadow-xl border border-gray-100 space-y-6"><h3 className="text-[#C5A059] font-bold text-[10px] uppercase tracking-widest mb-4">Business Information</h3><div className="grid gap-6"><div className="space-y-2"><label className="text-[9px] font-bold text-gray-400 uppercase">Business Name</label><input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full border-b py-2 outline-none focus:border-[#C5A059] font-serif text-lg text-[#002B5B]" /></div><div className="space-y-2"><label className="text-[9px] font-bold text-gray-400 uppercase">Contact Number</label><input type="text" value={businessPhone} onChange={(e) => setBusinessPhone(e.target.value)} className="w-full border-b py-2 outline-none focus:border-[#C5A059] font-serif text-lg text-[#002B5B]" /></div></div></div>
                  <div className="bg-white p-8 shadow-xl border border-gray-100 space-y-6"><h3 className="text-[#C5A059] font-bold text-[10px] uppercase tracking-widest mb-4">Security Settings</h3><div className="space-y-6"><input type="password" placeholder="OLD PASSWORD" className="w-full border-b py-3 text-[10px] font-bold outline-none focus:border-[#C5A059]" /><input type="password" placeholder="NEW PASSWORD" className="w-full border-b py-3 text-[10px] font-bold outline-none focus:border-[#C5A059]" /><input type="password" placeholder="CONFIRM NEW PASSWORD" className="w-full border-b py-3 text-[10px] font-bold outline-none focus:border-[#C5A059]" /></div><button className="bg-[#002B5B] text-white px-8 py-3 text-[10px] font-bold tracking-widest mt-6 hover:bg-[#C5A059] transition-all">UPDATE PASSWORD</button></div>
                </div>
              )}
              {/* --- ADMIN PRODUCTS MANAGEMENT --- */}
{adminTab === 'products' && (
  <div className="space-y-12">
    {/* Header Actions */}
    <div className="flex justify-between items-center border-b border-gray-100 pb-8">
      <div>
        <h3 className="text-2xl font-serif text-[#002B5B]">Inventory Suite</h3>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Manage your elite product range</p>
      </div>
      <button 
  onClick={handleOpenAdd} 
  className="bg-[#002B5B] text-white px-8 py-4 text-[10px] font-bold tracking-widest uppercase flex items-center gap-3 hover:bg-[#C5A059] transition-all shadow-lg"
>
  <Leaf size={14} /> Add New Product
</button>
    </div>

    {/* Product Management Grid */}
    <div className="space-y-4">
  {productList.map((p, i) => (
    <div key={i} className="group bg-white p-10 flex items-center justify-between border border-gray-50 hover:border-[#C5A059]/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-700 rounded-sm">
      <div className="flex items-center gap-16 text-left">
        {/* Grayscale to Color Transition */}
        <div className="h-20 w-20 flex items-center justify-center bg-gray-50 border border-gray-100 p-3">
  {p.img ? (
    <img 
      src={p.img} 
      className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-1000" 
      alt={p.name}
    />
  ) : (
    <Leaf size={20} className="text-gray-200" strokeWidth={1} />
  )}
</div>
        
        <div>
          <p className="text-[9px] font-bold text-[#C5A059] uppercase tracking-[0.3em] mb-1">{p.cat}</p>
          <h4 className="text-xl font-serif text-[#002B5B]">{p.name}</h4>
        </div>
      </div>

      <div className="flex gap-12 items-center">
        <button 
          onClick={() => { setEditingProduct(p); setFormData(p); setIsEditorOpen(true); }}
          className="text-[10px] font-bold tracking-widest uppercase text-gray-300 hover:text-[#002B5B] border-b border-transparent hover:border-[#002B5B] transition-all pb-1"
        >
          Edit Details
        </button>
        <button 
          onClick={() => setProductList(productList.filter(item => item.name !== p.name))}
          className="text-[10px] font-bold tracking-widest uppercase text-gray-300 hover:text-red-500 transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  ))}
</div>
    </div>
  
)}
            </main>
            <AnimatePresence>
  {isEditorOpen && (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[300] bg-white overflow-y-auto"
    >
      {/* Top Bar */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 px-12 py-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-6">
          <button onClick={() => setIsEditorOpen(false)} className="hover:rotate-90 transition-transform duration-500">
            <X size={20} strokeWidth={1}/>
          </button>
          <h2 className="text-[11px] font-bold tracking-[0.5em] uppercase text-[#002B5B]">
            {editingProduct ? "Modify Elite Product" : "Register New Ingredient"}
          </h2>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setIsEditorOpen(false)} className="px-8 py-3 text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-red-500 transition-colors">Discard</button>
          <button onClick={handleAction} className="bg-[#002B5B] text-white px-12 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-[#C5A059] transition-all shadow-xl">
            {editingProduct ? "Save Changes" : "Publish Product"}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-24 px-12 grid lg:grid-cols-2 gap-24">
        {/* Left: Image Selection */}
        <div className="space-y-8">
          <div className="aspect-square bg-gray-50 border border-gray-100 flex items-center justify-center group relative overflow-hidden">
  {/* Check if formData.img has a value and is NOT an empty string */}
  {formData.img && formData.img !== "" ? (
    <img 
      src={formData.img} 
      className="w-full h-full object-contain p-12 transition-transform duration-1000 group-hover:scale-110" 
      alt="Preview"
    />
  ) : (
    <div className="text-center">
      <Leaf size={40} strokeWidth={1} className="text-gray-200 mx-auto mb-4" />
      <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Select Product Visual</p>
    </div>
  )}
  <input 
    type="file" 
    accept="image/*"
    className="absolute inset-0 opacity-0 cursor-pointer" 
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, img: reader.result as string });
        };
        reader.readAsDataURL(file);
      }
    }}
  />
</div>
        </div>

        {/* Right: Refined Inputs */}
        <div className="space-y-12 text-left">
          <div className="space-y-8">
            <div className="border-b border-gray-100 pb-2">
              <label className="text-[9px] font-bold text-[#C5A059] uppercase tracking-widest block mb-1">Product Title</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full text-3xl font-serif outline-none bg-transparent text-[#002B5B]" placeholder="Enter Name..." />
            </div>

            <div>
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-4">Description</label>
              <textarea rows={5} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full text-sm font-light leading-relaxed border border-gray-100 p-6 outline-none focus:border-[#C5A059] transition-colors" placeholder="Type technical description here..." />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
  {Object.keys(formData.specs).map((key) => (
    <div key={key} className="border-b border-gray-100 pb-2">
      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
        {key}
      </label>
      <input 
        type="text" 
        value={formData.specs[key] || ""} // Ensure it defaults to empty string if undefined
        onChange={(e) => {
          // IMPORTANT: Create a deep copy of the specs object
          const updatedSpecs = { ...formData.specs, [key]: e.target.value };
          // Update the main formData state
          setFormData({ ...formData, specs: updatedSpecs });
        }} 
        className="w-full text-sm font-medium outline-none bg-transparent text-[#002B5B] focus:text-[#C5A059] transition-colors" 
        placeholder={`Enter ${key}...`}
      />
    </div>
  ))}
</div>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
            {/* --- PREMIUM ADD/EDIT PRODUCT MODAL --- */}
<AnimatePresence>
  {isProductModalOpen && (
    <div className="fixed inset-0 z-[300] flex justify-end bg-[#002B5B]/40 backdrop-blur-sm">
      <motion.div 
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }}
        className="w-full max-w-2xl bg-white h-screen shadow-2xl p-12 overflow-y-auto text-left"
      >
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-serif text-[#002B5B]">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={() => setIsProductModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24}/></button>
        </div>

        <div className="space-y-8">
          {/* Image Upload Mockup */}
          <div className="group relative h-48 bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center transition-all hover:border-[#C5A059]">
            {formProduct.img ? (
              <img src={formProduct.img} className="h-full w-full object-contain p-4" />
            ) : (
              <div className="text-center">
                <Download size={24} className="mx-auto text-gray-300 mb-2" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Upload Product Image</p>
              </div>
            )}
           <input 
  type="file" 
  accept="image/*"
  className="absolute inset-0 opacity-0 cursor-pointer" 
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      // This creates a temporary URL to preview the image you picked
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, img: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }}
/>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Product Name</label>
              <input type="text" value={formProduct.name} onChange={(e) => setFormProduct({...formProduct, name: e.target.value})} className="w-full border-b py-2 outline-none focus:border-[#C5A059] font-light" placeholder="e.g. Premium Garlic Powder" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
              <select value={formProduct.cat} onChange={(e) => setFormProduct({...formProduct, cat: e.target.value})} className="w-full border-b py-2 outline-none focus:border-[#C5A059] bg-transparent font-light">
                <option>Dehydrated Ingredients</option>
                <option>Fruit Powders</option>
                <option>Organic Superfoods</option>
                <option>Health & Wellness</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Full Description</label>
            <textarea rows={4} value={formProduct.description} onChange={(e) => setFormProduct({...formProduct, description: e.target.value})} className="w-full border p-4 outline-none focus:border-[#C5A059] font-light text-sm" placeholder="Describe the texture, process, and quality..." />
          </div>

          {/* ATTRIBUTES SECTION */}
          <div className="space-y-6 pt-6 border-t">
            <h3 className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.3em]">Technical Attributes</h3>
            <div className="grid grid-cols-2 gap-8">
              {Object.keys(formProduct.specs).map((key) => (
                <div key={key} className="space-y-2">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{key}</label>
                  <input type="text" value={(formProduct.specs as any)[key]} onChange={(e) => setFormProduct({...formProduct, specs: {...formProduct.specs, [key]: e.target.value}})} className="w-full border-b py-1 outline-none focus:border-[#C5A059] font-light" />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-12 flex gap-4">
            <button className="flex-grow bg-[#002B5B] text-white py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#C5A059] transition-all shadow-xl">
              {editingProduct ? 'Save Changes' : 'Publish Product'}
            </button>
            <button onClick={() => setIsProductModalOpen(false)} className="px-8 border border-gray-200 text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-gray-50 transition-all">
              Discard
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ATTRACTIVE FOOTER --- */}
      <footer className="bg-[#002B5B] text-white py-20 px-12 border-t border-[#C5A059]/20">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-5 gap-12">
    {/* Column 1: Brand Info */}
    <div className="lg:col-span-2">
      <img src="/logooo.jpeg" className="h-24 mb-6 bg-white p-2 rounded-sm" alt="Ayra Global Elite Logo" />
      <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
        Global merchant exporter of premium dehydrated ingredients. Connecting the world to Indian agricultural excellence.
      </p>
    </div>

    {/* Column 2: Navigation */}
    <div>
      <h4 className="text-[#C5A059] font-bold uppercase tracking-widest text-xs mb-8 underline decoration-1 underline-offset-8">Quick Navigation</h4>
      <div className="flex flex-col gap-4 text-sm font-light">
        <button onClick={() => setView('home')} className="text-left hover:text-[#C5A059] transition-colors">Home</button>
        <button onClick={() => setView('products')} className="text-left hover:text-[#C5A059] transition-colors">Catalogue</button>
        <a href="#about" className="hover:text-[#C5A059] transition-colors">About Ayra</a>
      </div>
    </div>

    {/* Column 3: Legal (New Column) */}
    <div>
      <h4 className="text-[#C5A059] font-bold uppercase tracking-widest text-xs mb-8 underline decoration-1 underline-offset-8">Legal</h4>
      <div className="flex flex-col gap-4 text-sm font-light text-gray-300">
        <a href="/privacy-policy" className="hover:text-[#C5A059] transition-colors">Privacy Policy</a>
       <button onClick={() => setView('admin-login')} className="hover:text-[#C5A059] transition-colors text-left">Admin</button>
      </div>
    </div>

    {/* Column 4: Social Connectivity */}
    <div>
      <h4 className="text-[#C5A059] font-bold uppercase tracking-widest text-xs mb-8 underline decoration-1 underline-offset-8">Follow Us</h4>
      <div className="flex gap-4">
        <a href="https://www.linkedin.com/company/ayra-global-elite/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-[#C5A059] transition-all">
          <Linkedin size={20}/>
        </a>
        <a href="https://www.facebook.com/profile.php?id=61586937672127" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-[#C5A059] transition-all">
          <Facebook size={20}/>
        </a>
        <a href="https://www.instagram.com/ayra_globalelite?igsh=dmN0d250dGNodTlm" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-[#C5A059] transition-all">
          <Instagram size={20}/>
        </a>
      </div>
    </div>
  </div>

  {/* Pune Office Info (Repositioned for 5-column layout balance) */}

  <div className="max-w-7xl mx-auto mt-8 text-center text-gray-500">
    <p className="text-[10px] tracking-[0.4em] uppercase">© 2026 Ayra Global Elite | Merchant Exporters | Pune, India</p>
  </div>
</footer>
    </main>
  );
}