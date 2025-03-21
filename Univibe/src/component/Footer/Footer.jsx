import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../../assets/pic/logo1.png';
import './FooterStyle.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section about">
                    <div className="footer-logo">
                        <img src={logo} alt="Univibe Logo" />
                    </div>
                    <p className="footer-description">
                        Univibe เป็นแพลตฟอร์มรวบรวมกิจกรรมทั้งหมดภายในมหาวิทยาลัยขอนแก่น
                        เพื่อให้นักศึกษาและบุคลากรเข้าถึงข้อมูลกิจกรรมได้อย่างสะดวกและรวดเร็ว
                    </p>
                    <div className="social-links">
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FaFacebook />
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <FaTwitter />
                        </a>
                        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                            <FaYoutube />
                        </a>
                    </div>
                </div>

                <div className="footer-section quick-links">
                    <h3>ลิงก์ด่วน</h3>
                    <ul>
                        <li><Link to="/">หน้าหลัก</Link></li>
                        <li><Link to="/search">ค้นหากิจกรรม</Link></li>
                        <li><a href="https://calendar.google.com/calendar/embed?src=univibekkuengineer%40gmail.com&ctz=Asia%2FBangkok" target="_blank" rel="noopener noreferrer">ปฏิทินกิจกรรม</a></li>
                        <li><a href="https://www.kku.ac.th/" target="_blank" rel="noopener noreferrer">เว็บไซต์มหาวิทยาลัย</a></li>
                        <li><a href="#" target="_blank" rel="noopener noreferrer">วิธีใช้งาน</a></li>
                    </ul>
                </div>

                <div className="footer-section categories">
                    <h3>หมวดหมู่กิจกรรม</h3>
                    <ul>
                        <li><Link to="/search?category=Academic">วิชาการ</Link></li>
                        <li><Link to="/search?category=Culture">วัฒนธรรม</Link></li>
                        <li><Link to="/search?category=Sport">กีฬา</Link></li>
                        <li><Link to="/search?category=Entertainment">บันเทิง</Link></li>
                        <li><Link to="/search?category=Volunteer">จิตอาสา</Link></li>
                    </ul>
                </div>

                <div className="footer-section contact">
                    <h3>ติดต่อเรา</h3>
                    <address>
                        <p><FaMapMarkerAlt /> มหาวิทยาลัยขอนแก่น 123 ถ.มิตรภาพ ต.ในเมือง อ.เมือง จ.ขอนแก่น 40002</p>
                        <p><FaPhone /> 043-009-700</p>
                        <p><FaEnvelope /> univibe@kku.ac.th</p>
                    </address>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="copyright">
                    &copy; {currentYear} Univibe. All Rights Reserved.
                </div>
                <div className="footer-bottom-links">
                    <Link to="/privacy-policy">นโยบายความเป็นส่วนตัว</Link>
                    <Link to="/terms-of-service">ข้อกำหนดการใช้งาน</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;