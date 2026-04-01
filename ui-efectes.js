        // Carrusel simple des de zero
        let currentPhoto = 0;
        let availablePhotos = [];
        let carouselTimer;
        
        // Llista de TOTES les fotos de la carpeta "fotos carrusel" (100+ fotos)
        const possibleNames = [
            '637342608_1264981785640235_5028289339600470882_n.jpg',
            '637891400_1245167154288365_4543567614426423916_n.jpg',
            '640123409_1248163917322022_5849344724219187852_n.jpg',
            '640347434_1248170963987984_5864211752994159597_n.jpg',
            '641151327_1248163957322018_3925250658994463830_n.jpg',
            '641201775_1248164180655329_9082908097421366593_n.jpg',
            '641252828_1248171007321313_6353859007910616272_n.jpg',
            '641343320_1249830560488691_7474481819191063599_n.jpg',
            '641464624_1248164220655325_1380808073701531895_n.jpg',
            '641533137_1248164270655320_6471759662471770783_n.jpg',
            '642269051_1249830403822040_4629335585003308586_n.jpg',
            '642758420_1248164310655316_8146791717505995657_n.jpg',
            '642776208_1253512066787207_6270212842525989513_n.jpg',
            '645358620_1255488743256206_416908085510047567_n.jpg',
            '645422827_1255488533256227_6845567531473464607_n.jpg',
            '645443471_1254655900006157_1450312188683859300_n.jpg',
            '645599681_1255481709923576_940360911739449004_n.jpg',
            '645629412_1255488486589565_2560285839183886756_n.jpg',
            '646336081_1255481886590225_4231249702209795390_n.jpg',
            '646985148_1255488573256223_7402930167217322290_n.jpg',
            '647547124_1255488693256211_3512659710617127582_n.jpg',
            '647549116_1259059969565750_657731959809544412_n.jpg',
            '647557827_1256310989840648_8387814998996610429_n.jpg',
            '647738962_1261811529290594_80604416451157122_n.jpg',
            '647860431_1261799879291759_4927651731082437102_n.jpg',
            '648096070_1260514569420290_7427666416743028154_n.jpg',
            '648278197_1255481936590220_4741419002027020614_n.jpg',
            '648279443_1261820905956323_2033660877321122344_n.jpg',
            '648279445_1261792325959181_8882029409507079789_n.jpg',
            '648381537_1259060302899050_1579877728725046177_n.jpg',
            '648385736_1259059632899117_1155246990804551387_n.jpg',
            '649114806_1261791902625890_8638059677072954042_n.jpg',
            '649128384_1258964322908648_523819114691148912_n.jpg',
            '649151958_1260514439420303_648946056524771842_n.jpg',
            '649166899_1259059729565774_2006485746599352677_n.jpg',
            '649169500_1261811259290621_6339101481349819400_n.jpg',
            '649177085_1261821299289617_6136562595323200266_n.jpg',
            '649178352_1261820999289647_2925806358162244765_n.jpg',
            '649185781_1258963956242018_1831208935630138791_n.jpg',
            '649221272_1258964109575336_7053454417513721938_n.jpg',
            '649272261_1261821052622975_1466008978735121151_n.jpg',
            '649272451_1259060092899071_4565283113319892059_n.jpg',
            '649273499_1259059506232463_5965074700542203091_n.jpg',
            '649275070_1264827455655668_4957358995025623490_n.jpg',
            '649275277_1261799615958452_7530250662054616495_n.jpg',
            '649278619_1259059849565762_5969454676962466833_n.jpg',
            '649278627_1259994046139009_1177346050920160276_n.jpg',
            '649287878_1260514372753643_7879959724317738853_n.jpg',
            '649299134_1261821179289629_8360188864080835694_n.jpg',
            '649326355_1258964476241966_554939536610988204_n.jpg',
            '649332005_1261791602625920_7322301553816008871_n.jpg',
            '649386388_1261799545958459_7550732768202450010_n.jpg',
            '649415303_1261806525957761_8331370781448852199_n.jpg',
            '649425168_1261811349290612_3465839054489198820_n.jpg',
            '649470979_1261821252622955_6817138497694197880_n.jpg',
            '649629444_1259993996139014_7368892785953764919_n.jpg',
            '649645656_1261791852625895_4783426884342797876_n.jpg',
            '649725042_1261799765958437_1731611037038646564_n.jpg',
            '649733275_1260514739420273_7250045120817098382_n.jpg',
            '649832361_1261811299290617_3363844631246267447_n.jpg',
            '649844037_1259060446232369_1937739632210057702_n.jpg',
            '649844037_1261791659292581_612039574363047388_n.jpg',
            '649856172_1258964002908680_501373331554437077_n.jpg',
            '649883443_1258964589575288_2456365328129398198_n.jpg',
            '649973479_1261791805959233_2781718074382918342_n.jpg',
            '649975945_1261811435957270_4410811157092887499_n.jpg',
            '650138735_1261811215957292_4794600321193101806_n.jpg',
            '650177933_1261799829291764_7511073481637801439_n.jpg',
            '650210805_1260514789420268_4827838977546355946_n.jpg',
            '650214965_1261791955959218_5042849807552780226_n.jpg',
            '650231800_1261799932625087_7812129243827995783_n.jpg',
            '650255227_1259060209565726_2546372166191203080_n.jpg',
            '650286628_1261811155957298_5721005538830763620_n.jpg',
            '650311571_1259994099472337_4438739539492942696_n.jpg',
            '650380586_1261792019292545_1366810238280223874_n.jpg',
            '650391753_1260514866086927_2499583804281218664_n.jpg',
            '650477125_1259993862805694_3394741932378523324_n.jpg',
            '650521851_1264827528988994_7425974318948576370_n.jpg',
            '650645178_1261821132622967_5780330944637116206_n.jpg',
            '650752572_1264827235655690_2884973575063765758_n.jpg',
            '650761295_1261792072625873_904042540546865388_n.jpg',
            '650761301_1261791469292600_6927874202601180669_n.jpg',
            '650795606_1261119319359815_4132647538239292383_n.jpg',
            '650801240_1261791552625925_4944646442271884522_n.jpg',
            '650808513_1259993906139023_673990570023920375_n.jpg',
            '650816306_1261792539292493_5695441279583163254_n.jpg',
            '650825674_1259060402899040_6622784316122363660_n.jpg',
            '650936972_1261791425959271_516065748788421107_n.jpg',
            '650992091_1261806215957792_2508249048735429365_n.jpg',
            '651034195_1261799429291804_110059779897098769_n.jpg',
            '651054210_1261791762625904_6019408829187902324_n.jpg',
            '651071081_1259993802805700_5899454559016950952_n.jpg',
            '651168655_1264827368989010_7208550435694060684_n.jpg',
            '651174296_1261119106026503_5560891632072643265_n.jpg',
            '651175484_1261806385957775_4921215833460063253_n.jpg',
            '651183138_1261799472625133_7275723106686470039_n.jpg',
            '651193025_1261792422625838_7018448751658122100_n.jpg',
            '651198378_1261821219289625_6468312707821884420_n.jpg',
            '651231677_1261799665958447_9106032327805200458_n.jpg',
            '651243321_1261806265957787_8557178817682808985_n.jpg',
            '651243394_1261119392693141_7187289053035573740_n.jpg',
            '651274315_1264981842306896_7627168579800444836_n.jpg',
            '651278690_1261799995958414_5962340279679576682_n.jpg',
            '651304618_1266418038829943_5771906887596784430_n.jpg',
            '651318354_1264981732306907_4703336767913159601_n.jpg',
            '651318599_1261811475957266_2089106097388685092_n.jpg',
            '651346641_1264827408989006_3560076163367939497_n.jpg',
            '651346719_1266417812163299_3526563535467404324_n.jpg',
            '651371893_1264827292322351_3474066121452439980_n.jpg',
            '651682573_1261799792625101_1697759582402416594_n.jpg',
            '651760012_1261806329291114_410391595814205535_n.jpg',
            '651760015_1261792235959190_6989180434377690171_n.jpg',
            '651762031_1261792645959149_1972804442739223005_n.jpg',
            '651762372_1261791722625908_8797454004399783002_n.jpg',
            '651801748_1261792139292533_9176984144178556904_n.jpg',
            '651925730_1261806472624433_3722574458382755450_n.jpg',
            '652179859_1261821095956304_4869624293850794038_n.jpg',
            '652287438_1261811599290587_5494844282219362816_n.jpg',
            '652292992_1261806432624437_5420933337071056353_n.jpg',
            '652551009_1261799712625109_4329939377253072350_n.jpg',
            '652913396_1261820955956318_6587803970531840533_n.jpg',
            '652914693_1266417892163291_1048469414505020998_n.jpg',
            '653037252_1264827332322347_3407063400950323583_n.jpg',
            '653040818_1264982042306876_6768759870352574081_n.jpg',
            '653053973_1264981985640215_8580891284410489833_n.jpg',
            '653516613_1264827498988997_4661859015671118833_n.jpg',
            '653802949_1266417995496614_8601311465082241859_n.jpg',
            '653889360_1266418082163272_6646050316065420443_n.jpg',
            '653916790_1264827202322360_769752660350575710_n.jpg',
            '654234387_1264981935640220_1271931361938798756_n.jpg',
            '654849359_1264827148989032_2180507648687610200_n.jpg',
            '655302269_1271416134996800_4805575916368675971_n.jpg',
            '655962555_1266417948829952_1901346113596085182_n.jpg',
            '657342305_1268155205322893_9021048343802759335_n.jpg'
        ];
        
        function findAvailablePhotos() {
            availablePhotos = [];
            let foundCount = 0;
            
            // NO mostrar foto inicial todavía, esperar a detectar las disponibles
            const img = document.getElementById('carouselImg');
            img.src = 'fotos/activo1.jpg'; // imagen temporal mientras carga
            
            possibleNames.forEach((name, index) => {
                const testImg = new Image();
                testImg.onload = function() {
                    availablePhotos.push(`fotos carrusel/${name}`);
                    foundCount++;
                    console.log(`Foto encontrada: ${name} (${foundCount} totales)`);
                    
                    // Cuando tengamos fotos, mostrar una aleatoria y empezar el carrusel
                    if (foundCount >= 3) {
                        // Elegir una foto aleatoria de las que SÍ existen
                        const randomIndex = Math.floor(Math.random() * availablePhotos.length);
                        img.src = availablePhotos[randomIndex];
                        console.log(`Primera foto aleatoria: ${availablePhotos[randomIndex]}`);
                        startCarousel();
                    }
                };
                testImg.onerror = function() {
                    console.log(`Foto no encontrada: ${name}`);
                };
                testImg.src = 'fotos carrusel/' + name;
            });
            
            // Si no encontramos fotos después de 3 segundos, mantener la temporal
            setTimeout(() => {
                if (availablePhotos.length === 0) {
                    console.log('No se encontraron fotos en fotos carrusel/');
                    // Mantener la imagen temporal
                } else {
                    console.log(`Se encontraron ${availablePhotos.length} fotos`);
                    if (availablePhotos.length < 3 && availablePhotos.length > 0) {
                        // Si hay pocas fotos, mostrar una aleatoria de las disponibles
                        const randomIndex = Math.floor(Math.random() * availablePhotos.length);
                        img.src = availablePhotos[randomIndex];
                        startCarousel();
                    }
                }
            }, 3000);
        }
        
        function nextPhoto() {
            if (availablePhotos.length === 0) return;
            
            // Seleccionar una foto completamente aleatoria
            const randomIndex = Math.floor(Math.random() * availablePhotos.length);
            currentPhoto = randomIndex;
            
            const img = document.getElementById('carouselImg');
            
            img.src = availablePhotos[currentPhoto];
        }
        
        function startCarousel() {
            if (carouselTimer) {
                clearInterval(carouselTimer);
            }
            if (availablePhotos.length > 0) {
                carouselTimer = setInterval(nextPhoto, 3000);
            }
        }
        
        function stopCarousel() {
            if (carouselTimer) {
                clearInterval(carouselTimer);
            }
        }
        
        // ── Advanced UX Features ──
        
        // 1. Scroll Spy with Navigation Indicator
        function initScrollSpy() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            const indicator = document.createElement('div');
            indicator.className = 'scroll-spy-indicator';
            
            // Add indicator to navigation
            const nav = document.querySelector('nav');
            if (nav) {
                nav.style.position = 'relative';
                nav.appendChild(indicator);
            }
            
            function updateActiveSection() {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    // Earlier trigger for dades-programa section (400px before instead of 100px)
                    const triggerOffset = section.id === 'dades-programa' ? 400 : 100;
                    if (pageYOffset >= sectionTop - triggerOffset) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const linkHref = link.getAttribute('href');
                    
                    // Special handling for Nosotros link
                    if (link.id === 'nosotros-link' && current === 'dades-programa') {
                        link.classList.add('active');
                        
                        // Move indicator
                        const linkRect = link.getBoundingClientRect();
                        const navRect = nav.getBoundingClientRect();
                        indicator.style.width = `${linkRect.width}px`;
                        indicator.style.left = `${linkRect.left - navRect.left}px`;
                    }
                    // Normal handling for other links
                    else if (linkHref === `#${current}`) {
                        link.classList.add('active');
                        
                        // Move indicator
                        const linkRect = link.getBoundingClientRect();
                        const navRect = nav.getBoundingClientRect();
                        indicator.style.width = `${linkRect.width}px`;
                        indicator.style.left = `${linkRect.left - navRect.left}px`;
                    }
                });
            }
            
            window.addEventListener('scroll', updateActiveSection);
            updateActiveSection(); // Initial call
        }
        
        // 2. 3D Tilt Cards - Service Cards Sink at Cursor Position
        function initTilt3D() {
            const cards = document.querySelectorAll('.card-hover');
            
            cards.forEach(card => {
                card.classList.add('tilt-card');
                
                const inner = document.createElement('div');
                inner.className = 'tilt-card-inner';
                
                // Move all child elements to inner div
                while (card.firstChild) {
                    inner.appendChild(card.firstChild);
                }
                card.appendChild(inner);
                
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    // Make the cursor position sink down (negative rotation)
                    const rotateX = (y - centerY) / centerY * -12;  // Negative to sink at cursor
                    const rotateY = (centerX - x) / centerX * -12;  // Negative to sink at cursor
                    
                    // Both background and content tilt in same direction (sink at cursor)
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    inner.style.transform = `translateZ(20px) rotateX(0deg) rotateY(0deg)`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
                    inner.style.transform = 'translateZ(20px)';
                });
            });
        }
        
        // 3. Confetti Burst Effect - REMOVED
        // function initConfettiBurst() {
        //     // Functionality removed as requested
        // }
        
        // 4. Page Transition
        function initPageTransition() {
            const panel = document.createElement('div');
            panel.className = 'page-transition-panel';
            document.body.appendChild(panel);
            
            // Handle internal links
            document.addEventListener('click', (e) => {
                const link = e.target.closest('a');
                if (link && link.href && link.href.includes('.html') && !link.href.includes(window.location.hostname)) {
                    e.preventDefault();
                    
                    // Exit animation
                    panel.classList.add('exit');
                    
                    setTimeout(() => {
                        window.location.href = link.href;
                    }, 600);
                }
            });
            
            // Enter animation on page load
            window.addEventListener('load', () => {
                setTimeout(() => {
                    panel.classList.add('enter');
                    setTimeout(() => {
                        panel.classList.remove('enter', 'exit');
                    }, 600);
                }, 100);
            });
        }
        
        // 5. Magnetic Buttons - REMOVED
        // function initMagneticButtons() {
        //     // Functionality removed as requested
        // }
        
        // 6. Animated Stat Counters
        function initStatCounters() {
            // Create stats container if not exists
            let statsContainer = document.querySelector('.stats-container');
            if (!statsContainer) {
                // Find the green program card and add stats
                const programCard = document.querySelector('.gradient-bg');
                if (programCard) {
                    statsContainer = document.createElement('div');
                    statsContainer.className = 'stats-container grid grid-cols-3 gap-8 mt-8';
                    statsContainer.innerHTML = `
                        <div class="stat-item">
                            <div class="stat-counter" data-target="40">0</div>
                            <div class="stat-label">Usuaris</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-counter" data-target="9">0</div>
                            <div class="stat-label">Àrees</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-counter" data-target="100">0</div>
                            <div class="stat-label">ACP</div>
                        </div>
                    `;
                    programCard.appendChild(statsContainer);
                }
            }
            
            // Animate counters when in viewport
            const counters = document.querySelectorAll('.stat-counter');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = parseInt(counter.getAttribute('data-target'));
                        const duration = 2000;
                        const step = target / (duration / 16);
                        let current = 0;
                        
                        const updateCounter = () => {
                            current += step;
                            if (current < target) {
                                counter.textContent = Math.ceil(current);
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = target + '+';
                                counter.parentElement.classList.add('pulse');
                                setTimeout(() => {
                                    counter.parentElement.classList.remove('pulse');
                                }, 300);
                            }
                        };
                        
                        updateCounter();
                        observer.unobserve(counter);
                    }
                });
            });
            
            counters.forEach(counter => observer.observe(counter));
            
            // Show stat items with animation
            const statItems = document.querySelectorAll('.stat-item');
            const itemObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 100);
                        itemObserver.unobserve(entry.target);
                    }
                });
            });
            
            statItems.forEach(item => itemObserver.observe(item));
        }
        
        // Initialize all features
        document.addEventListener('DOMContentLoaded', function() {
            initScrollSpy();
            initTilt3D();
            initPageTransition();
            initStatCounters();
        });
        
        // Iniciar cuando cargue la página
        document.addEventListener('DOMContentLoaded', function() {
            const carouselDiv = document.querySelector('.relative.h-80');
            if (carouselDiv) {
                carouselDiv.addEventListener('mouseenter', stopCarousel);
                carouselDiv.addEventListener('mouseleave', startCarousel);
            }
            
            // Buscar fotos disponibles
            findAvailablePhotos();
        });
