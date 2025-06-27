import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Package,
  PlusCircle,
  Tags,
  Store,
  ShoppingCart,
  Truck,
  Undo2,
  Users,
  MessageSquare,
  Percent,
  CreditCard,
  RefreshCcw,
  Globe,
  Settings,
  DollarSign,
  ShieldCheck,
  UserCog,
  Key,
  Mail,
  FileText,
  Image,
  Menu as MenuIcon,
  Send,
  BarChart2,
  LifeBuoy,
  Ticket,
} from 'lucide-react';

const Menu = () => {
  const [open, setOpen] = useState({
    catalog: false,
    orders: false,
    customers: false,
    coupons: false,
    payments: false,
    shipping: false,
    storeSettings: false,
    system: false,
    cms: false,
    marketing: false,
    support: false,
  });

  const toggleMenu = (key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navLinkClasses = 'flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 text-emerald-600';

  return (
    <div className="bg-white w-60 h-screen shadow-md px-4 fixed top-14 left-0 z-20 overflow-y-auto pb-20">
      {/* <h1 className="text-base font-sans font-medium mb-3 text-emerald-500 px-2">
        Admin Panel <span className="ml-2">&#x27B2;</span>
      </h1> */}
      <ul className="space-y-2 text-base">

        {/* Dashboard */}
        <li>
          <NavLink to="/" className={navLinkClasses}>
            <LayoutDashboard size={18} /> Overview
          </NavLink>
        </li>

        {/* Catalog */}
        <li>
          <div onClick={() => toggleMenu('catalog')} className={`${navLinkClasses} justify-between cursor-pointer`}>
            
            <span className="flex items-center gap-2"><Package size={18} /> Catalog</span>

            {open.catalog ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          {open.catalog && (
            <ul className="pl-6 mt-1 space-y-1">
              <li><NavLink to="/products" className={navLinkClasses}><Package size={16} /> Products</NavLink></li>
              <li><NavLink to="/categories" className={navLinkClasses}><Tags size={16} /> Categories</NavLink></li>
              <li><NavLink to="/brands" className={navLinkClasses}><Store size={16} /> Brands</NavLink></li>
              <li><NavLink to="/attributes" className={navLinkClasses}><Store size={16} /> Attributes</NavLink></li>
            <li><NavLink to="/coupons" className={navLinkClasses}><Percent size={16} /> All Coupons</NavLink></li>
            </ul>
          )}
        </li>

        {/* Orders */}
        <li>
          <div onClick={() => toggleMenu('orders')} className={`${navLinkClasses} justify-between cursor-pointer`}>
            <span className="flex items-center gap-2"><ShoppingCart size={18} /> Orders</span>
            {open.orders ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          {open.orders && (
            <ul className="pl-6 mt-1 space-y-1">
              <li><NavLink to="/orders" className={navLinkClasses}><ShoppingCart size={16} />  Orders</NavLink></li>
              <li><NavLink to="/orders/shipping-status" className={navLinkClasses}><Truck size={16} /> Shipping Status</NavLink></li>
              <li><NavLink to="/orders/returns" className={navLinkClasses}><Undo2 size={16} /> Returns</NavLink></li>
            </ul>
          )}
        </li>

        
        {/* Coupons */}
        {/* <li>
          <div onClick={() => toggleMenu('coupons')} className={`${navLinkClasses} justify-between cursor-pointer`}>
            <span className="flex items-center gap-2"><Percent size={18} /> Coupons</span>
            {open.coupons ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          {open.coupons && (
            <ul className="pl-6 mt-1 space-y-1">
              <li><NavLink to="/coupons" className={navLinkClasses}><Percent size={16} /> All Coupons</NavLink></li>
              <li><NavLink to="/coupons/new" className={navLinkClasses}><PlusCircle size={16} /> Create New</NavLink></li>
            </ul>
          )}
        </li> */}

        {/* Payments */}
        <li>
          <div onClick={() => toggleMenu('payments')} className={`${navLinkClasses} justify-between cursor-pointer`}>
            <span className="flex items-center gap-2"><CreditCard size={18} /> Payments</span>
            {open.payments ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          {open.payments && (
            <ul className="pl-6 mt-1 space-y-1">
              <li><NavLink to="/transactions" className={navLinkClasses}><CreditCard size={16} /> Transactions</NavLink></li>
              <li><NavLink to="/refunds" className={navLinkClasses}><RefreshCcw size={16} /> Refund Requests</NavLink></li>
            </ul>
          )}
        </li>

        {/* Customers */}
        <li>
          <div onClick={() => toggleMenu('customers')} className={`${navLinkClasses} justify-between cursor-pointer`}>
            <span className="flex items-center gap-2"><Users size={18} /> Customers</span>
            {open.customers ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          {open.customers && (
            <ul className="pl-6 mt-1 space-y-1">
              <li><NavLink to="/customers" className={navLinkClasses}><Users size={16} /> All Customers</NavLink></li>
              {/* <li><NavLink to="/contacts" className={navLinkClasses}><MessageSquare size={16} /> Contact Messages</NavLink></li> */}
            </ul>
          )}
        </li>


        {/* Shipping */}
        {/* <li>
          <div onClick={() => toggleMenu('shipping')} className={`${navLinkClasses} justify-between cursor-pointer`}>
            <span className="flex items-center gap-2"><Truck size={18} /> Shipping</span>
            {open.shipping ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          {open.shipping && (
            <ul className="pl-6 mt-1 space-y-1">
              <li><NavLink to="/shipping/zones" className={navLinkClasses}><Globe size={16} /> Zones</NavLink></li>
              <li><NavLink to="/shipping/methods" className={navLinkClasses}><Truck size={16} /> Methods</NavLink></li>
            </ul>
          )}
        </li> */}

        {/*  Settings */}
        <li>
          <div onClick={() => toggleMenu('storeSettings')} className={`${navLinkClasses} justify-between cursor-pointer`}>
            <span className="flex items-center gap-2"><Settings size={18} />  Settings</span>
            {open.storeSettings ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          {open.storeSettings && (
            <ul className="pl-6 mt-1 space-y-1">
            <li><NavLink to="/settings/general" className={navLinkClasses}><Settings size={16} /> Stores </NavLink></li>
              {/* <li><NavLink to="/settings/general" className={navLinkClasses}><Settings size={16} /> General Info</NavLink></li> */}
              <li><NavLink to="/settings/currency-tax" className={navLinkClasses}><DollarSign size={16} /> Currency/Tax</NavLink></li>
             
              <li><NavLink to="/shipping/zones" className={navLinkClasses}><Globe size={16} /> Zones</NavLink></li>
              <li><NavLink to="/shipping/methods" className={navLinkClasses}><Truck size={16} /> Methods</NavLink></li>
               <li><NavLink to="/weight-class" className={navLinkClasses}><Truck size={16} /> Weight Class</NavLink></li>
                <li><NavLink to="/height-class" className={navLinkClasses}><Truck size={16} /> Height Class</NavLink></li>
                 <li><NavLink to="/length-class" className={navLinkClasses}><Truck size={16} /> Length Class</NavLink></li>
           
            </ul>
          )}
        </li>

        {/* System */}
        {/* <li>
          <div onClick={() => toggleMenu('system')} className={`${navLinkClasses} justify-between cursor-pointer`}>
            <span className="flex items-center gap-2"><UserCog size={18} /> System</span>
            {open.system ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          {open.system && (
            <ul className="pl-6 mt-1 space-y-1">
              <li><NavLink to="/system/admins" className={navLinkClasses}><UserCog size={16} /> Admin Users</NavLink></li>
              <li><NavLink to="/system/roles" className={navLinkClasses}><Key size={16} /> Roles</NavLink></li>
              <li><NavLink to="/system/emailsms" className={navLinkClasses}><Mail size={16} /> Email/SMS Settings</NavLink></li>
            </ul>
          )}
        </li> */}

        {/* CMS */}
        <li>
          <div onClick={() => toggleMenu('cms')} className={`${navLinkClasses} justify-between cursor-pointer`}>
            <span className="flex items-center gap-2"><FileText size={18} /> CMS</span>
            {open.cms ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          {open.cms && (
            <ul className="pl-6 mt-1 space-y-1">
              <li><NavLink to="/cms/pages" className={navLinkClasses}><FileText size={16} /> Pages</NavLink></li>
              <li><NavLink to="/cms/banners" className={navLinkClasses}><Image size={16} /> Banners</NavLink></li>
              <li><NavLink to="/cms/menus" className={navLinkClasses}><MenuIcon size={16} /> Menus</NavLink></li>
               <li><NavLink to="/settings/policies" className={navLinkClasses}><ShieldCheck size={16} /> Policies</NavLink></li>
            </ul>
          )}
        </li>

        {/* Marketing */}
        {/* <li>
          <div onClick={() => toggleMenu('marketing')} className={`${navLinkClasses} justify-between cursor-pointer`}>
            <span className="flex items-center gap-2"><Send size={18} /> Marketing</span>
            {open.marketing ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          {open.marketing && (
            <ul className="pl-6 mt-1 space-y-1">
              <li><NavLink to="/marketing/newsletter" className={navLinkClasses}><Send size={16} /> Newsletter</NavLink></li>
              <li><NavLink to="/marketing/seo" className={navLinkClasses}><BarChart2 size={16} /> SEO Tools</NavLink></li>
            </ul>
          )}
        </li> */}

        {/* Support */}
        <li>
          <div onClick={() => toggleMenu('support')} className={`${navLinkClasses} justify-between cursor-pointer`}>
            <span className="flex items-center gap-2"><LifeBuoy size={18} /> Support</span>
            {open.support ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          {open.support && (
            <ul className="pl-6 mt-1 space-y-1">
              <li><NavLink to="/support/messages" className={navLinkClasses}><MessageSquare size={16} /> Contact Messages</NavLink></li>
              <li><NavLink to="/support/tickets" className={navLinkClasses}><Ticket size={16} /> Tickets</NavLink></li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Menu;
