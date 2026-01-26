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
                            <div className="logo-icon">
                                <img src="/Logo.jfif" alt="Logo" />
                            </div>
                            <span>preparacademy</span>
                        </div>
                        <p className="footer-desc">
                            أكاديمية إعداد منصة تعليمية متخصصة تقدم ملفات شاملة ومتكاملة، مصممة لتسهيل عملية التعلم وتحقيق أفضل النتائج.
                        </p>
                        <div className="social-links">
                            <a href="https://wa.me/966567908664" target="_blank" rel="noreferrer" className="social-btn" aria-label="WhatsApp"><IconWhatsApp /></a>
                            <a href="https://instagram.com/preparacademy" target="_blank" rel="noreferrer" className="social-btn" aria-label="Instagram"><IconInstagram /></a>
                            <a href="https://twitter.com/preparacademy" target="_blank" rel="noreferrer" className="social-btn" aria-label="Twitter"><IconTwitter /></a>
                            <a href="https://facebook.com/preparacademy" target="_blank" rel="noreferrer" className="social-btn" aria-label="Facebook"><IconFacebook /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h4>روابط مهمة</h4>
                        <ul>
                            <li><a href="/">الرئيسية</a></li>
                            <li><a href="/exam">ابدأ الاختبار</a></li>
                            <li><a href="https://preparacademy.com/" target="_blank" rel="noreferrer">متجر الأكاديمية</a></li>
                            <li><a href="#">سياسة الخصوصية</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-contact">
                        <h4>تواصل معنا</h4>
                        <ul>
                            <li>
                                <IconPhone className="contact-icon" />
                                <span>+966 567 908 664</span>
                            </li>
                            <li>
                                <IconMail className="contact-icon" />
                                <span>preparacademy2024@gmail.com</span>
                            </li>
                            <li>
                                <span className="contact-text">المملكة العربية السعودية</span>
                            </li>
                        </ul>
                    </div>

                    {/* Payment & Trust */}
                    <div className="footer-trust">
                        <h4>وسائل الدفع</h4>
                        <div className="payment-icons">
                            <IconVisa />
                            <IconMastercard />
                            <IconMada />
                            <IconApplePay />
                        </div>
                        <p className="trust-text">جميع المدفوعات آمنة ومشفرة.</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>جميع الحقوق محفوظة © 2026 | preparacademy</p>
                </div>
            </div>
        </footer>
    );
}
