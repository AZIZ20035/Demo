"use client";

import React from 'react';
import {
    IconBook,
    IconWhatsApp,
    IconInstagram,
    IconTwitter,
    IconFacebook,
    IconPhone,
    IconMail,
    IconVisa,
    IconMastercard,
    IconApplePay,
    IconMada
} from './Icons';

export default function Footer() {
    return (
        <footer className="footer-main">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Info */}
                    <div className="footer-brand">
                        <div className="logo mb-2">
                            <div className="logo-icon" style={{ overflow: 'hidden' }}>
                                <img src="/Logo.jfif" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <span>preparacademy</span>
                        </div>
                        <p className="footer-desc">
                            preparacademy منصة تعليمية متكاملة تهدف إلى تطوير مهارات الطلاب وتحقيق أفضل النتائج من خلال محتوى تعليمي مبتكر ومبسط.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-btn" aria-label="WhatsApp"><IconWhatsApp /></a>
                            <a href="#" className="social-btn" aria-label="Instagram"><IconInstagram /></a>
                            <a href="#" className="social-btn" aria-label="Twitter"><IconTwitter /></a>
                            <a href="#" className="social-btn" aria-label="Facebook"><IconFacebook /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h4>روابط سريعة</h4>
                        <ul>
                            <li><a href="/">الصفحة الرئيسية</a></li>
                            <li><a href="/exam">بدء الاختبار</a></li>
                            <li><a href="#">المدونة</a></li>
                            <li><a href="#">الأسئلة الشائعة</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-contact">
                        <h4>تواصل معنا</h4>
                        <ul>
                            <li>
                                <IconPhone className="contact-icon" />
                                <span>+966 500 000 000</span>
                            </li>
                            <li>
                                <IconMail className="contact-icon" />
                                <span>info@preparacademy.com</span>
                            </li>
                            <li>
                                <span className="contact-text">الرياض، المملكة العربية السعودية</span>
                            </li>
                        </ul>
                    </div>

                    {/* Payment & Trust */}
                    <div className="footer-trust">
                        <h4>وسائل الدفع الآمنة</h4>
                        <div className="payment-icons">
                            <IconVisa />
                            <IconMastercard />
                            <IconMada />
                            <IconApplePay />
                        </div>
                        <p className="trust-text">جميع المدفوعات محمية ومشفرة بأحدث التقنيات الأمنية.</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>جميع الحقوق محفوظة © 2026 | preparacademy</p>
                </div>
            </div>
        </footer>
    );
}
