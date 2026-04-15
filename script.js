// Dummy Data for Hairstyles and Face Shapes
const hairstylesData = [
    {
        id: 1,
        name_ar: "قصة Fade الكلاسيكية",
        name_en: "Classic Fade",
        shape: "square",
        audience: "men",
        description_ar: "تعمل الجوانب القصيرة والمدرجة على تليين زوايا الوجه المربع وإبراز الفك.",
        description_en: "Short, faded sides soften square face angles and highlight the jawline.",
        image: "images/fade.jpg"
    },
    {
        id: 2,
        name_ar: "قصة Pompadour",
        name_en: "Pompadour",
        shape: "round",
        audience: "men",
        description_ar: "تضيف حجماً من الأعلى مما يعطي إيحاء بطول الوجه الدائري ويقلل من استدارته.",
        description_en: "Adds volume on top, creating an illusion of length for round faces.",
        image: "images/pompadour.png"
    },
    {
        id: 3,
        name_ar: "قصة Buzz Cut",
        name_en: "Buzz Cut",
        shape: "oval",
        audience: "men",
        description_ar: "الوجه البيضاوي يتناسب مع جميع القصات الرياضية مثل الباز كات القصيرة جداً.",
        description_en: "Oval faces suit almost all sporty cuts like the very short Buzz cut.",
        image: "images/oval_buzz.jpg"
    },
    {
        id: 4,
        name_ar: "قصة Quiff الحديثة",
        name_en: "Modern Quiff",
        shape: "square",
        audience: "men",
        description_ar: "قصة عصرية مثالية لإبراز الفك المربع بأسلوب أنيق وشبابي.",
        description_en: "A modern cut perfect for highlighting a square jaw with a youthful style.",
        image: "images/quiff.jpg"
    },
    {
        id: 5,
        name_ar: "قصة الخط الجانبي الكلاسيكية",
        name_en: "Classic Side-Part",
        shape: "round",
        audience: "kids",
        description_ar: "قصة أنيقة للصغار تلائم الأوجه الدائرية وتعطيهم مظهراً مرتباً وجذاباً.",
        description_en: "An elegant cut for kids that suits round faces and looks very neat.",
        image: "images/kids.png"
    },
    {
        id: 6,
        name_ar: "تجعيد الشعر المرفوع (Curly Fringe)",
        name_en: "Curly Fringe",
        shape: "oval",
        audience: "men",
        description_ar: "تضيف مظهراً شبابياً وتبرز تناسق الوجه البيضاوي الكلاسيكي.",
        description_en: "Adds a youthful look and highlights classic oval face proportions.",
        image: "images/oval_curly.jpg"
    }
];

// Dummy Data for Trends Sections
const trendsData = [
    {
        id: 1,
        title_ar: "ستايل French Crop",
        title_en: "French Crop Style",
        image: "images/trend_crop.png"
    },
    {
        id: 2,
        title_ar: "التدرج العالي (High Fade)",
        title_en: "High Fade",
        image: "images/trend_fade.png"
    },
    {
        id: 3,
        title_ar: "لحية كثيفة مع تحديد صارم",
        title_en: "Thick Beard with Sharp Line-up",
        image: "images/trend_beard.jpg"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    
    let currentLang = localStorage.getItem('barber_lang') || 'ar';
    let currentShape = null;

    // Functions that need to be hoisted
    window.applyTiltEffect = function(elements) {
        elements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -10; 
                const rotateY = ((x - centerX) / centerX) * 10;
                
                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                el.style.transition = 'transform 0.1s ease-out';
                if(!el.classList.contains('featured')){
                  el.style.zIndex = '5';
                }
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                el.style.transition = 'transform 0.5s ease-out';
                if(!el.classList.contains('featured')){
                  el.style.zIndex = '1';
                }
            });
        });
    };

    const lightboxOverlay = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    window.openLightbox = function(src) {
        if(lightboxImg && lightboxOverlay) {
            lightboxImg.src = src;
            lightboxOverlay.style.display = 'flex';
        }
    };

    // Suggester Logic (Face Shapes)
    const buttons = document.querySelectorAll('.shape-btn');
    const resultsContainer = document.getElementById('suggesterResults');

    if(buttons.length > 0) {
        resultsContainer.innerHTML = `<p style="text-align:center; width:100%; color:var(--text-muted); grid-column: 1 / -1;">${currentLang === 'en' ? 'Please select a face shape from the buttons above.' : 'يرجى اختيار شكل الوجه من الأزرار أعلاه لعرض القصات المُقترحة.'}</p>`;
        resultsContainer.classList.add('visible');
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active style
            buttons.forEach(b => b.classList.remove('active'));
            // Add active style
            e.target.classList.add('active');

            currentShape = e.target.getAttribute('data-shape');
            renderHairstyles(currentShape);
        });
    });

    window.renderHairstyles = function(shape) {
        if(!shape) return;
        resultsContainer.classList.remove('visible');
        
        setTimeout(() => {
            const filtered = hairstylesData.filter(item => item.shape === shape);
            
            if(filtered.length === 0) {
                resultsContainer.innerHTML = `<p style="text-align:center; width:100%; grid-column: 1 / -1;">${currentLang === 'en' ? 'No data available.' : 'لا توجد بيانات متوفرة حالياً لهذا الشكل.'}</p>`;
            } else {
                const markup = filtered.map(item => {
                    const name = currentLang === 'en' ? item.name_en : item.name_ar;
                    const desc = currentLang === 'en' ? item.description_en : item.description_ar;
                    const aud = item.audience === 'kids' ? (currentLang === 'en' ? '👦 Kids' : '👦 للأطفال') : (currentLang === 'en' ? '👨 Men' : '👨 للرجال');
                    return `
                    <div class="style-card">
                        <img src="${item.image}" alt="${name}" class="style-card-img clickable-style-img" style="cursor: pointer;">
                        <div class="style-card-content">
                            <h3>${name}</h3>
                            <p>${desc}</p>
                            <span class="audience-badge">${aud}</span>
                        </div>
                    </div>
                `}).join('');
                resultsContainer.innerHTML = markup;
            }
            // Re-apply hover listeners (interactivity)
            const newCards = document.querySelectorAll('.style-card');
            applyTiltEffect(newCards);
            
            // Apply lightbox logic
            document.querySelectorAll('.clickable-style-img').forEach(img => {
                img.addEventListener('click', (e) => openLightbox(e.target.src));
            });
            
            resultsContainer.classList.add('visible');
        }, 400);
    };

    // Render Trends Section dynamically
    window.renderTrends = function() {
        const trendsGrid = document.getElementById('trendsGrid');
        if (trendsGrid) {
            const trendsMarkup = trendsData.map(trend => {
                const title = currentLang === 'en' ? trend.title_en : trend.title_ar;
                return `
                <div class="trend-card">
                    <img src="${trend.image}" alt="${title}" style="cursor: pointer;" class="clickable-trend-img">
                    <div class="trend-overlay">
                        <h3>${title}</h3>
                    </div>
                </div>
            `}).join('');
            trendsGrid.innerHTML = trendsMarkup;

            // Apply interaction logic
            const newTrends = document.querySelectorAll('.trend-card');
            applyTiltEffect(newTrends);
            
            // Apply lightbox logic
            document.querySelectorAll('.clickable-trend-img').forEach(img => {
                img.addEventListener('click', (e) => openLightbox(e.target.src));
            });
        }
    };
    renderTrends();

    // Mobile Menu Toggle interaction
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            if(navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.right = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(11, 12, 16, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.textAlign = 'center';
            }
        });
    }

    // === Additions for New Features ===

    // 1. Page Loader
    const loader = document.getElementById('page-loader');
    if (loader) {
        const removeLoader = () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
            }, 500);
        };
        if (document.readyState === 'complete') {
            removeLoader();
        } else {
            window.addEventListener('load', removeLoader);
        }
    }

    // 2. Click Sound
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playClickSound() {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    }
    document.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button') || e.target.closest('a')) {
            playClickSound();
        }
    });

    // 3. User Login Check & Logout Logic
    const storedUser = localStorage.getItem('barber_user');
    const loginLink = document.getElementById('login-link');
    const logoutBtn = document.getElementById('logout-btn');
    const userGreeting = document.getElementById('user-greeting');
    const userNameDisplay = document.getElementById('user-name-display');

    if (storedUser) {
        const userObj = JSON.parse(storedUser);
        if (loginLink && userGreeting && userNameDisplay && logoutBtn) {
            loginLink.style.display = 'none';
            userGreeting.style.display = 'inline-block';
            logoutBtn.style.display = 'inline-block';
            userNameDisplay.textContent = userObj.name;
        }
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('barber_user');
            window.location.reload();
        });
    }

    // 4. Cart Logic
    let cart = JSON.parse(localStorage.getItem('barber_cart')) || [];
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalPrice = document.getElementById('cart-total-price');

    if(cartBtn) cartBtn.addEventListener('click', () => cartSidebar.classList.add('open'));
    if(closeCartBtn) closeCartBtn.addEventListener('click', () => cartSidebar.classList.remove('open'));

    function updateCartUI() {
        if(!cartCount || !cartItemsContainer || !cartTotalPrice) return;
        cartCount.textContent = cart.length;
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.title}</h4>
                        <span>${item.price} ${currentLang === 'en' ? 'SAR' : 'ر.س'}</span>
                    </div>
                    <button class="remove-item-btn" data-index="${index}">&times;</button>
                </div>
            `;
        });
        cartTotalPrice.textContent = `${total} ${currentLang === 'en' ? 'SAR' : 'ر.س'}`;
        localStorage.setItem('barber_cart', JSON.stringify(cart));
        
        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                cart.splice(idx, 1);
                updateCartUI();
            });
        });
    }

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.package-card');
            const title = card.querySelector('h3').textContent;
            const priceText = card.querySelector('.package-price').textContent;
            const price = parseInt(priceText.replace(/\D/g, ''));
            cart.push({ title, price });
            updateCartUI();
            cartSidebar.classList.add('open');
        });
    });

    // 5. Modals Logic
    const modalOverlay = document.getElementById('package-modal');
    const modalBody = document.getElementById('modal-body-content');
    const closeModal = document.querySelector('.close-modal');

    if(closeModal) closeModal.addEventListener('click', () => modalOverlay.classList.remove('active'));
    if(modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if(e.target === modalOverlay) modalOverlay.classList.remove('active');
        });
    }

    document.querySelectorAll('.open-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.package-card');
            const title = card.querySelector('h3').textContent;
            const featuresHTML = card.querySelector('.package-features').innerHTML;
            modalBody.innerHTML = `<h3 style="color:var(--gold-primary); margin-bottom: 20px;">${title}</h3><ul class="package-features" style="text-align: ${document.documentElement.dir === 'rtl' ? 'right' : 'left'};">${featuresHTML}</ul>`;
            modalOverlay.classList.add('active');
        });
    });

    document.querySelectorAll('.service-banner').forEach(banner => {
        banner.addEventListener('click', (e) => {
            const title = banner.querySelector('h3').textContent;
            const desc = banner.querySelector('p').textContent;
            modalBody.innerHTML = `<h3 style="color:var(--gold-primary); margin-bottom: 20px;">${title}</h3><p style="text-align: ${document.documentElement.dir === 'rtl' ? 'right' : 'left'}; line-height: 1.8;">${desc}</p>`;
            modalOverlay.classList.add('active');
        });
    });

    // 5.5 Booking Logic
    const bookingModal = document.getElementById('booking-modal');
    const heroBookBtn = document.getElementById('hero-book-btn');
    const closeBookingBtn = document.getElementById('close-booking');
    const bookingFormContainer = document.getElementById('booking-form-container');
    const bookingManageContainer = document.getElementById('booking-manage-container');
    const submitBookingBtn = document.getElementById('submit-booking-btn');
    const cancelBookingBtn = document.getElementById('cancel-booking-btn');
    const bookingDetailsText = document.getElementById('booking-details-text');
    const bookNameInput = document.getElementById('book-name');
    const bookDateInput = document.getElementById('book-date');
    const bookTimeInput = document.getElementById('book-time');

    function checkBookingState() {
        const storedAppointment = localStorage.getItem('barber_appointment');
        if (storedAppointment) {
            const data = JSON.parse(storedAppointment);
            if(heroBookBtn) heroBookBtn.textContent = document.documentElement.lang === 'en' ? 'Manage Appointment' : 'إدارة الحجز';
            bookingFormContainer.style.display = 'none';
            bookingManageContainer.style.display = 'block';
            bookingDetailsText.innerHTML = `<strong>الاسم:</strong> ${data.name}<br><strong>التاريخ:</strong> ${data.date}<br><strong>الوقت:</strong> ${data.time}`;
            if(document.documentElement.lang === 'en') {
                bookingDetailsText.innerHTML = `<strong>Name:</strong> ${data.name}<br><strong>Date:</strong> ${data.date}<br><strong>Time:</strong> ${data.time}`;
            }
        } else {
            if(heroBookBtn) heroBookBtn.textContent = document.documentElement.lang === 'en' ? 'Book Appointment' : 'احجز موعدك';
            bookingFormContainer.style.display = 'block';
            bookingManageContainer.style.display = 'none';
            // Auto fill name if logged in
            if(storedUser) {
                const userObj = JSON.parse(storedUser);
                if(bookNameInput) bookNameInput.value = userObj.name;
            }
        }
    }
    
    if (heroBookBtn) {
        heroBookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            checkBookingState();
            bookingModal.classList.add('active');
        });
    }
    
    if (closeBookingBtn) {
        closeBookingBtn.addEventListener('click', () => bookingModal.classList.remove('active'));
    }
    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if(e.target === bookingModal) bookingModal.classList.remove('active');
        });
    }

    if (submitBookingBtn) {
        submitBookingBtn.addEventListener('click', () => {
            if(!bookNameInput.value || !bookDateInput.value || !bookTimeInput.value) {
                alert(document.documentElement.lang === 'en' ? 'Please fill all fields' : 'الرجاء تعبئة جميع الحقول');
                return;
            }
            const appointment = {
                name: bookNameInput.value,
                date: bookDateInput.value,
                time: bookTimeInput.value
            };
            localStorage.setItem('barber_appointment', JSON.stringify(appointment));
            checkBookingState();
            bookingModal.classList.remove('active');
        });
    }

    if (cancelBookingBtn) {
        cancelBookingBtn.addEventListener('click', () => {
            localStorage.removeItem('barber_appointment');
            checkBookingState();
            bookingModal.classList.remove('active');
        });
    }

    // Call state check initially, also need to hook it to applyLang!
    checkBookingState();

    // 6. Language Switcher (AR/EN)
    const translations = {
        ar: {
            nav_home: "الرئيسية", nav_advisor: "مستشار القصات", nav_trends: "أحدث الصيحات", nav_packages: "الباقات",
            nav_login: "تسجيل الدخول", nav_logout: "تسجيل الخروج", cart_title: "سلة المشتريات", cart_total: "الإجمالي:", cart_checkout: "إتمام الطلب",
            packages_title: "باقات العناية المميزة",
            pkg_kids_title: "باقة الأطفال (Kids Area)", pkg_kids_f1: "قص شعر عصري يناسب عمر الطفل", pkg_kids_f2: "بيئة ترفيهية ومريحة", pkg_kids_f3: "تعقيم ورعاية خاصة",
            badge_popular: "الأكثر طلباً", pkg_vip_title: "باكدج العريس الفاخر", pkg_vip_f1: "حلاقة VIP وتحديد دقيق", pkg_vip_f2: "العناية بالبشرة (Skin Care) وماسك", pkg_vip_f3: "العناية بالشعر (Hair Care) وبخار", pkg_vip_f4: "العناية باللحية (Beard Care)", pkg_vip_f5: "تصفيف الشعر والتثبيت",
            pkg_classic_title: "الباقة الكلاسيكية", pkg_classic_f1: "قص وتدريج الشعر الأساسي", pkg_classic_f2: "حلاقة الذقن بالماكينة أو الموس", pkg_classic_f3: "غسيل الشعر وتنشيفه",
            btn_details: "التفاصيل", btn_add_cart: "أضف للسلة", btn_book: "احجز موعدك", btn_cancel: "إلغاء الحجز",
            extra_services_title: "خدمات ضيافة وعناية إضافية", extra_services_sub: "نقدم لك أكثر من مجرد حلاقة... تجربة راقية متكاملة.",
            cafe_title: "☕ قسم الكافيه (Cafe Section)", cafe_desc: "استمتع بقهوتك المفضلة ومشروباتك المنعشة أثناء انتظارك أو بعد الحلاقة.",
            care_title: "🌿 العناية المتخصصة", care_desc: "عناية متقدمة للبشرة (Skin)، الشعر (Hair)، واللحية (Beard) بمنتجات عالمية فاخرة.",
            spa_title: "💆 مساج وسبا (Spa Area)", spa_desc: "استرخِ في قسم المساج المجهز بأفضل تقنيات الاسترخاء.",
            vip_title: "🌟 غرف VIP خاصة", vip_desc: "استمتع بخصوصيتك التامة وحلاقة فاخرة جداً في قسم كبار الشخصيات.",
            footer_rights: "© 2026 جميع الحقوق محفوظة لصالون سمارت باربر للحلاقة الفاخرة.",
            hero_title: "الأناقة تبدأ <span>من هنا</span>", hero_desc: "اكتشف القصة المثالية لشكل وجهك وأحدث الموديلات في عالم حلاقة الرجال والأطفال. خدمات فاخرة وأجواء استثنائية بانتظارك.", hero_btn: "اكتشف قصتك المناسبة",
            face_shape_title: "مستشار القصات الذكي", face_shape_sub: "اختر شكل وجهك ودعنا نقترح لك القصة التي تبرز ملامحك بأفضل شكل.",
            shape_round: "وجه دائري", shape_square: "وجه مربع", shape_oval: "وجه بيضاوي",
            trends_title: "أحدث صيحات الحلاقة 2026", trends_sub: "تصفح أبرز الاتجاهات العصرية في عالم الشعر واللحية."
        },
        en: {
            nav_home: "Home", nav_advisor: "Style Advisor", nav_trends: "Latest Trends", nav_packages: "Packages",
            nav_login: "Login", nav_logout: "Logout", cart_title: "Shopping Cart", cart_total: "Total:", cart_checkout: "Checkout",
            packages_title: "Premium Care Packages",
            pkg_kids_title: "Kids Area Package", pkg_kids_f1: "Modern haircut suitable for kids", pkg_kids_f2: "Comfortable and fun environment", pkg_kids_f3: "Special care and sterilization",
            badge_popular: "Most Popular", pkg_vip_title: "VIP Groom Package", pkg_vip_f1: "VIP Haircut & precise fading", pkg_vip_f2: "Skin Care & Gold Mask", pkg_vip_f3: "Hair Care & Steaming", pkg_vip_f4: "Premium Beard Care", pkg_vip_f5: "Hair styling & fixing",
            pkg_classic_title: "Classic Package", pkg_classic_f1: "Basic haircut and fading", pkg_classic_f2: "Beard shaving (machine or razor)", pkg_classic_f3: "Hair washing and drying",
            btn_details: "Details", btn_add_cart: "Add to Cart", btn_book: "Book Appointment", btn_cancel: "Cancel Appointment",
            extra_services_title: "Hospitality & Extra Care Services", extra_services_sub: "More than just a haircut... A complete premium experience.",
            cafe_title: "☕ Cafe Section", cafe_desc: "Enjoy your favorite coffee and refreshing drinks while waiting or after your haircut.",
            care_title: "🌿 Specialized Care", care_desc: "Advanced Skin, Hair, and Beard care using premium global products.",
            spa_title: "💆 Massage & Spa Area", spa_desc: "Relax in our perfectly equipped massage and relaxation area.",
            vip_title: "🌟 Private VIP Rooms", vip_desc: "Enjoy ultimate privacy and a highly luxurious haircut in our VIP section.",
            footer_rights: "© 2026 All rights reserved to Smart Barber Shop.",
            hero_title: "Elegance starts <span>Here</span>", hero_desc: "Discover the perfect cut for your face shape and the latest trends in men's and kids' grooming. Premium services and an exceptional atmosphere waiting for you.", hero_btn: "Discover Your Style",
            face_shape_title: "Smart Style Advisor", face_shape_sub: "Select your face shape and let us suggest cuts that elevate your look.",
            shape_round: "Round Face", shape_square: "Square Face", shape_oval: "Oval Face",
            trends_title: "Latest Hair Trends 2026", trends_sub: "Browse the most modern trends in hair and beard styles."
        }
    };
    const langBtn = document.getElementById('lang-btn');

    function applyLang(lang) {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        if(langBtn) {
            langBtn.textContent = lang === 'ar' ? 'EN' : 'AR';
        }
        localStorage.setItem('barber_lang', lang);
        currentLang = lang;
        updateCartUI(); // Refresh currency symbols
        checkBookingState(); // Refresh booking texts
        if(window.renderTrends) window.renderTrends(); // Re-render dynamic trends
        if(window.renderHairstyles) window.renderHairstyles(currentShape); // Re-render dynamic haircuts
    }
    applyLang(currentLang);

    if(langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            applyLang(currentLang);
        });
    }

    const initialInteractiveElements = document.querySelectorAll('.package-card, .service-banner');
    window.applyTiltEffect(initialInteractiveElements);

    // Lightbox Logic
    const closeLightboxBtn = document.getElementById('close-lightbox');

    if(closeLightboxBtn) {
        closeLightboxBtn.addEventListener('click', () => {
            if(lightboxOverlay) lightboxOverlay.style.display = 'none';
        });
    }

    if(lightboxOverlay) {
        lightboxOverlay.addEventListener('click', (e) => {
            if(e.target === lightboxOverlay) lightboxOverlay.style.display = 'none';
        });
    }

    // Scroll Fade-In Effect
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sectionsToFade = document.querySelectorAll('.section-title, .section-subtitle, .package-card, .service-banner, .trend-card');
    sectionsToFade.forEach(el => {
        if (!el.classList.contains('visible')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            fadeObserver.observe(el);
        }
    });

});
