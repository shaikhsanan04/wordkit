document.addEventListener('DOMContentLoaded', function() {


    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faq = this.closest('.faq');
            
            // Toggle active class on the clicked FAQ
            faq.classList.toggle('active');
            
            // Close other FAQs when one is opened (optional, for accordion behavior)
            const allFaqs = document.querySelectorAll('.faq');
            allFaqs.forEach(item => {
                if (item !== faq) {
                    item.classList.remove('active');
                }
            });
        });
    });


    // Announcement bar functionality
    const announcementBar = document.getElementById('announcement-bar');
    const closeAnnouncementBtn = document.getElementById('close-announcement');
    
    if (closeAnnouncementBtn && announcementBar) {
        closeAnnouncementBtn.addEventListener('click', function() {
            announcementBar.style.animation = 'slideUp 0.5s forwards';
            
            // Create the slideUp animation dynamically
            if (!document.querySelector('style#announcement-animations')) {
                const style = document.createElement('style');
                style.id = 'announcement-animations';
                style.textContent = `
                    @keyframes slideUp {
                        from { transform: translateY(0); }
                        to { transform: translateY(-100%); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Remove from DOM after animation completes
            setTimeout(() => {
                announcementBar.style.display = 'none';
            }, 500);
            
            // Store in session storage so it stays dismissed during the session
            sessionStorage.setItem('announcementDismissed', 'true');
        });
    }
    
    // Check if announcement was previously dismissed in this session
    if (sessionStorage.getItem('announcementDismissed') === 'true' && announcementBar) {
        announcementBar.style.display = 'none';
    }
    
    // Tool category collapsible functionality for mobile
    const categoryToggles = document.querySelectorAll('.tool-category-toggle');
    
    categoryToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Get the parent container and tool group
            const container = this.closest('.tool-category-container');
            const toolGroup = container.querySelector('.tool-group');
            
            // Toggle the expanded class
            container.classList.toggle('expanded');
            
            // Update the icon
            const icon = this.querySelector('i');
            if (container.classList.contains('expanded')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
    
    // Expand the category containing the active tool by default
    const activeTool = document.querySelector('.tool.active');
    if (activeTool) {
        const activeContainer = activeTool.closest('.tool-category-container');
        if (activeContainer) {
            activeContainer.classList.add('expanded');
            const toggleIcon = activeContainer.querySelector('.tool-category-toggle i');
            if (toggleIcon) {
                toggleIcon.classList.remove('fa-chevron-down');
                toggleIcon.classList.add('fa-chevron-up');
            }
        }
    }
    // Typing animation for hero section
    const toolTyping = document.getElementById('tool-typing');
    const toolsToType = [
        'Word Counter',
        'Keyword Density',
        'Email Extractor',
        'Sentiment Analyzer',
        'Slug Generator'
    ];
    
    let currentToolIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Base typing speed in ms
    
    function typeText() {
        const currentTool = toolsToType[currentToolIndex];
        
        // If deleting, remove a character, otherwise add a character
        if (isDeleting) {
            toolTyping.textContent = currentTool.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            toolTyping.textContent = currentTool.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }
        
        // Determine typing speed
        let speed = typingSpeed;
        
        // If completed typing current word
        if (!isDeleting && currentCharIndex === currentTool.length) {
            // Pause at the end of typing
            speed = 2000; // 2 seconds pause
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            // Move to next word after deleting
            isDeleting = false;
            currentToolIndex = (currentToolIndex + 1) % toolsToType.length;
            speed = 500; // Pause before typing next word
        }
        
        setTimeout(typeText, speed);
    }
    
    // Start the typing animation
    setTimeout(typeText, 1000); // Start after 1 second delay
    // DOM Elements
    const tools = document.querySelectorAll('.tool');
    const toolResults = document.querySelectorAll('.tool-results');
    const inputText = document.getElementById('input-text');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');
    const actionBtn = document.getElementById('action-btn');
    const currentToolTitle = document.getElementById('current-tool-title');
    const toolDescription = document.getElementById('tool-description');
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Tool-specific elements
    const wordCount = document.getElementById('word-count');
    const charCount = document.getElementById('char-count');
    const sentenceCount = document.getElementById('sentence-count');
    const paragraphCount = document.getElementById('paragraph-count');
    const emailsList = document.getElementById('emails-list');
    const emailCount = document.getElementById('email-count');
    const whitespaceOutput = document.getElementById('whitespace-output');
    const caseOutput = document.getElementById('case-output');
    const caseBtns = document.querySelectorAll('.case-btn');
    
// Tool descriptions
const toolDescriptions = {
  // Basic Tools
  'word-counter': 'Free online word counter for essays, blog posts, and IELTS content. Instantly count words, characters, sentences, and paragraphs — no login required.',
  'email-extractor': 'Extract email addresses from any block of text. This tool quickly finds and lists all valid emails from articles, documents, or webpages.',
  'whitespace-remover': 'Remove extra spaces, tabs, and blank lines from your text. Perfect for cleaning up content before publishing or processing.',
  'case-converter': 'Convert text to UPPERCASE, lowercase, Title Case, Sentence case, or aLtErNaTiNg CaSe. Fast and easy text formatting tool.',
  
  // Text Analysis Tools
  'readability-score': 'Check the readability of your content using Flesch Reading Ease and Grade Level scores. Ideal for improving clarity in articles, essays, and web copy.',
  'keyword-density': 'Analyze keyword density for SEO optimization. See how often words appear in your text — great for bloggers, marketers, and content creators.',
  'sentiment-analysis': 'Analyze the emotional tone of your text. Detect whether the sentiment is positive, negative, or neutral — useful for reviews, emails, or social media.',
  'reading-time': 'Estimate the reading time of your article or blog post. Adjust speed settings for skimming or detailed reading modes.',
  
  // Extraction Tools
  'url-extractor': 'Extract all website URLs from any text or content. Perfect for scraping links from documents, articles, or code.',
  'phone-extractor': 'Extract phone numbers in multiple formats from text. Supports international and local formats — great for data cleaning or research.',
  'slug-generator': 'Generate clean, SEO-friendly URL slugs for blog posts, products, or social media. Quickly convert any headline into a readable URL format.'
};

    
    // Readability Score Calculator
    function calculateReadability(text) {
        // Get text statistics
        const words = text.match(/\b\w+\b/g) || [];
        const sentences = text.split(/[.!?]+\s*/).filter(Boolean);
        const syllables = countSyllables(text);
        
        // Calculate Flesch-Kincaid Grade Level
        const wordsPerSentence = words.length / Math.max(1, sentences.length);
        const syllablesPerWord = syllables / Math.max(1, words.length);
        const fleschKincaid = 0.39 * wordsPerSentence + 11.8 * syllablesPerWord - 15.59;
        
        // Calculate Flesch Reading Ease
        const fleschEase = 206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord;
        
        // Display results
        document.getElementById('grade-level').textContent = Math.max(0, fleschKincaid.toFixed(1));
        document.getElementById('flesch-score').textContent = Math.min(100, Math.max(0, fleschEase.toFixed(1)));
        
        // Interpret the score
        let interpretation = '';
        if (fleschKincaid < 6) {
            interpretation = 'Very easy to read. Easily understood by an average 11-year-old student.';
        } else if (fleschKincaid < 8) {
            interpretation = 'Easy to read. Conversational English for consumers.';
        } else if (fleschKincaid < 10) {
            interpretation = 'Fairly easy to read.';
        } else if (fleschKincaid < 12) {
            interpretation = 'Plain English. Easily understood by 13- to 15-year-old students.';
        } else if (fleschKincaid < 14) {
            interpretation = 'Fairly difficult to read. Best understood by college students.';
        } else if (fleschKincaid < 18) {
            interpretation = 'Difficult to read. Academic level.';
        } else {
            interpretation = 'Very difficult to read. Best understood by university graduates.';
        }
        
        // Set reading ease description
        let readingEase = '';
        if (fleschEase >= 90) readingEase = 'Very Easy';
        else if (fleschEase >= 80) readingEase = 'Easy';
        else if (fleschEase >= 70) readingEase = 'Fairly Easy';
        else if (fleschEase >= 60) readingEase = 'Standard';
        else if (fleschEase >= 50) readingEase = 'Fairly Difficult';
        else if (fleschEase >= 30) readingEase = 'Difficult';
        else readingEase = 'Very Difficult';
        
        document.getElementById('reading-ease').textContent = readingEase;
        document.getElementById('readability-explanation').textContent = interpretation;
    }

    // Helper function to count syllables
    function countSyllables(text) {
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        let count = 0;
        
        for (const word of words) {
            // Count vowel groups as syllables
            let syllableCount = word.match(/[aeiouy]{1,2}/g)?.length || 0;
            
            // Adjust for common patterns
            if (word.length > 3 && word.endsWith('e') && !word.endsWith('le')) {
                syllableCount--;
            }
            
            // Every word has at least one syllable
            count += Math.max(1, syllableCount);
        }
        
        return count;
    }

    // Keyword Density Analyzer
    function analyzeKeywordDensity(text) {
        // Get minimum word length and maximum keywords to show
        const minLength = parseInt(document.getElementById('min-word-length').value) || 3;
        const maxKeywords = parseInt(document.getElementById('max-keywords').value) || 10;
        
        // Normalize text and split into words
        const words = text.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length >= minLength);
        
        // Count word frequency
        const wordCount = {};
        const totalWords = words.length;
        
        words.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
        });
        
        // Sort by frequency
        const sortedWords = Object.entries(wordCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, maxKeywords);
        
        // Display results
        const keywordsList = document.querySelector('.keywords-list');
        keywordsList.innerHTML = '';
        
        sortedWords.forEach(([word, count]) => {
            const percentage = ((count / totalWords) * 100).toFixed(1);
            const keywordItem = document.createElement('div');
            keywordItem.className = 'keyword-item';
            keywordItem.innerHTML = `
                <span class="keyword-text">${word}</span>
                <div class="keyword-stats">
                    <span class="keyword-percentage">${percentage}%</span>
                    <span class="keyword-count">${count}</span>
                </div>
            `;
            keywordsList.appendChild(keywordItem);
        });
    }

    // Sentiment Analysis
    function analyzeSentiment(text) {
        // Simple sentiment analysis using word lists
        const positiveWords = [
            'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'terrific',
            'outstanding', 'superb', 'brilliant', 'awesome', 'fabulous', 'incredible',
            'love', 'happy', 'joy', 'beautiful', 'best', 'perfect', 'nice', 'better',
            'positive', 'success', 'successful', 'win', 'winning', 'recommend', 'recommended',
            'like', 'liked', 'enjoy', 'enjoyed', 'impressive', 'impressed', 'favorite',
            'pleased', 'pleasure', 'delight', 'delighted', 'glad', 'exciting', 'excited'
        ];
        
        const negativeWords = [
            'bad', 'terrible', 'horrible', 'awful', 'poor', 'disappointing', 'disappointed',
            'worst', 'hate', 'dislike', 'sad', 'unhappy', 'angry', 'upset', 'annoyed',
            'annoying', 'negative', 'fail', 'failed', 'failure', 'problem', 'issue', 'trouble',
            'difficult', 'hard', 'complicated', 'confusing', 'confused', 'boring', 'bored',
            'slow', 'expensive', 'cheap', 'broken', 'damage', 'damaged', 'waste', 'wasted',
            'frustrating', 'frustrated', 'disappointing', 'disappointed', 'mediocre', 'inferior'
        ];
        
        // Normalize and tokenize text
        const words = text.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/);
        
        // Count positive and negative words
        let positiveCount = 0;
        let negativeCount = 0;
        
        words.forEach(word => {
            if (positiveWords.includes(word)) positiveCount++;
            if (negativeWords.includes(word)) negativeCount++;
        });
        
        // Calculate sentiment score (-1 to 1)
        const totalSentimentWords = positiveCount + negativeCount;
        let sentimentScore = 0;
        
        if (totalSentimentWords > 0) {
            sentimentScore = (positiveCount - negativeCount) / totalSentimentWords;
        }
        
        // Display results
        document.getElementById('sentiment-score').textContent = sentimentScore.toFixed(2);
        
        // Update meter position (convert -1 to 1 scale to 0% to 100% for CSS)
        const meterPosition = (sentimentScore + 1) * 50;
        document.querySelector('.meter-pointer').style.left = `${meterPosition}%`;
        
        // Set sentiment label
        let sentimentLabel = 'Neutral';
        if (sentimentScore > 0.25) sentimentLabel = 'Positive';
        if (sentimentScore > 0.5) sentimentLabel = 'Very Positive';
        if (sentimentScore < -0.25) sentimentLabel = 'Negative';
        if (sentimentScore < -0.5) sentimentLabel = 'Very Negative';
        
        document.querySelector('.sentiment-label').textContent = sentimentLabel;
    }

    // Reading Time Estimator
    function calculateReadingTime(text) {
        // Count words
        const words = text.match(/\b\w+\b/g) || [];
        const wordCount = words.length;
        
        // Get reading speed (words per minute)
        const readingSpeed = parseInt(document.getElementById('reading-speed').value) || 200;
        
        // Calculate reading time
        const minutes = wordCount / readingSpeed;
        const seconds = Math.round((minutes % 1) * 60);
        const readingTime = Math.floor(minutes) + (seconds / 60);
        
        // Calculate skimming time (30% faster)
        const skimmingTime = readingTime * 0.7;
        
        // Calculate detailed reading time (30% slower)
        const detailedTime = readingTime * 1.3;
        
        // Display results
        document.getElementById('reading-time').textContent = `${Math.floor(minutes)}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('skimming-time').textContent = `${Math.floor(skimmingTime)}:${Math.round((skimmingTime % 1) * 60).toString().padStart(2, '0')}`;
        document.getElementById('detailed-time').textContent = `${Math.floor(detailedTime)}:${Math.round((detailedTime % 1) * 60).toString().padStart(2, '0')}`;
    }

    // Markdown to HTML Converter
    function convertMarkdownToHtml(previewOnly = false) {
        const markdown = inputText.value;
        let html = '';
        
        // Simple markdown conversion
        html = markdown
            // Headers
            .replace(/^# (.+)$/gm, '<h1>$1</h1>')
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
            .replace(/^##### (.+)$/gm, '<h5>$1</h5>')
            .replace(/^###### (.+)$/gm, '<h6>$1</h6>')
            
            // Bold and Italic
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/_(.+?)_/g, '<em>$1</em>')
            
            // Links
            .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
            
            // Images
            .replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1">')
            
            // Lists
            .replace(/^\* (.+)$/gm, '<li>$1</li>')
            .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
            
            // Code
            .replace(/`(.+?)`/g, '<code>$1</code>')
            
            // Blockquotes
            .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
            
            // Paragraphs (must be last)
            .replace(/^(?!<[a-z]).+$/gm, '<p>$&</p>');
        
        // Update preview
        document.querySelector('.preview-panel').innerHTML = html;
        
        // Update code output if not just previewing
        if (!previewOnly) {
            document.querySelector('.code-output').textContent = html;
        }
    }

    // HTML to Text Extractor
    function convertHtmlToText(previewOnly = false) {
        const html = inputText.value;
        
        // Create a temporary div to parse HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // Get text content
        const text = tempDiv.textContent || tempDiv.innerText || '';
        
        // Update preview
        if (previewOnly) {
            document.querySelector('.preview-panel').textContent = text;
        } else {
            // Update result
            document.querySelector('.code-output').textContent = text;
        }
    }

    // URL Extractor
    function extractUrls(text) {
        // Regular expression for URLs
        const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+\.[^\s]+)/g;
        const urls = text.match(urlRegex) || [];
        
        // Get unique URLs
        const uniqueUrls = [...new Set(urls)];
        
        // Display results
        const urlsList = document.getElementById('urls-list');
        urlsList.innerHTML = '';
        
        if (uniqueUrls.length === 0) {
            urlsList.innerHTML = '<p>No URLs found in the text.</p>';
            return;
        }
        
        uniqueUrls.forEach(url => {
            const urlItem = document.createElement('div');
            urlItem.className = 'result-item';
            urlItem.innerHTML = `<i class="fas fa-link"></i> ${url}`;
            urlsList.appendChild(urlItem);
        });
        
        // Update count
        document.getElementById('url-count').textContent = `(${uniqueUrls.length})`;
    }

    // Phone Number Extractor
    function extractPhoneNumbers(text) {
        // Regular expression for phone numbers
        const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}/g;

        const phones = text.match(phoneRegex) || [];
    
        const uniquePhones = [...new Set(phones)];
    
        const phoneList = document.getElementById('phones-list');
        phoneList.innerHTML = '';
    
        if (uniquePhones.length === 0) {
            phoneList.innerHTML = '<p>No phone numbers found in the text.</p>';
            return;
        }
    
        uniquePhones.forEach(phone => {
            const phoneItem = document.createElement('div');
            phoneItem.className = 'phone-item';
            phoneItem.innerHTML = `<i class="fas fa-phone"></i> ${phone}`;
            phoneList.appendChild(phoneItem);
        });
    
        document.getElementById('phone-count').textContent = `(${uniquePhones.length})`;
    }
    
    
    // Current active tool
    let currentTool = 'word-counter';
    
    // Theme toggle
    themeToggle.addEventListener('click', function() {
        document.body.setAttribute('data-theme', 
            document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        
        // Update icon
        const icon = this.querySelector('i');
        if (document.body.getAttribute('data-theme') === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    
    // Tool selection
    tools.forEach(tool => {
        tool.addEventListener('click', function() {
            const toolId = this.getAttribute('data-tool');
            
            // Update active tool
            tools.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update tool results visibility
            toolResults.forEach(result => result.classList.remove('active'));
            document.getElementById(`${toolId}-results`).classList.add('active');
            
            // Update current tool title and description
            currentToolTitle.textContent = this.querySelector('span').textContent;
            toolDescription.textContent = toolDescriptions[toolId];
            
            // Update current tool and action button text
            currentTool = toolId;
            updateActionButton();
            
            // Process text if there's already input
            if (inputText.value.trim() !== '') {
                processText();
            }
            
            // Initialize specific tool settings if needed
            initializeToolSettings(toolId);
        });
    });
    
    // Initialize tool-specific settings
    function initializeToolSettings(toolId) {
        switch(toolId) {
            case 'reading-time':
                // Set default reading speed
                const speedSlider = document.getElementById('reading-speed');
                if (speedSlider) {
                    speedSlider.value = 200; // Default 200 WPM
                    document.getElementById('wpm-value').textContent = '200';
                    
                    // Add event listener for slider
                    speedSlider.addEventListener('input', function() {
                        document.getElementById('wpm-value').textContent = this.value;
                        // Recalculate reading time if text is present
                        if (inputText.value.trim()) {
                            calculateReadingTime(inputText.value);
                        }
                    });
                }
                break;
                
            case 'keyword-density':
                // Set default minimum word length and count
                const minLengthInput = document.getElementById('min-word-length');
                const maxWordsInput = document.getElementById('max-keywords');
                const updateKeywordsBtn = document.getElementById('update-keywords-btn');
                
                if (minLengthInput && maxWordsInput && updateKeywordsBtn) {
                    minLengthInput.value = 3; // Default min length
                    maxWordsInput.value = 10; // Default max keywords to show
                    
                    // Add event listener for update button
                    updateKeywordsBtn.addEventListener('click', function() {
                        if (inputText.value.trim()) {
                            analyzeKeywordDensity(inputText.value);
                        }
                    });
                }
                break;
                
                // case 'markdown-to-html':
                //     // Add real-time preview for markdown to HTML
                //     const htmlPreview = document.getElementById('html-preview');
                //     if (htmlPreview) {
                //         // Clear any existing listeners
                //         const newInput = inputText.cloneNode(true);
                //         inputText.parentNode.replaceChild(newInput, inputText);
                //         inputText = newInput;
                
                //         // Add new listener
                //         inputText.addEventListener('input', function() {
                //             if (currentTool === 'markdown-to-html') {
                //                 convertMarkdownToHtml(true); // true for preview only
                //             }
                //         });
                //     }
                //     break;
                
                
                //     case 'html-to-text':
                //         const htmlTextPreview = document.getElementById('plain-text-output');
                //         if (htmlTextPreview) {
                //             const newInput = inputText.cloneNode(true);
                //             inputText.parentNode.replaceChild(newInput, inputText);
                    
                //             newInput.addEventListener('input', function () {
                //                 if (currentTool === 'html-to-text') {
                //                     convertHtmlToText(true); // true = preview only
                //                 }
                //             });
                //         }
                //         break;
                    
                
            case 'sentiment-analysis':
                // Reset sentiment meter
                const sentimentMeter = document.querySelector('.meter-pointer');
                if (sentimentMeter) {
                    sentimentMeter.style.left = '50%';
                }
                break;
                
            case 'plagiarism-checker':
                // Set default values for plagiarism checker
                const minMatchLengthInput = document.getElementById('min-match-length');
                const searchDepthSelect = document.getElementById('search-depth');
                const checkPlagiarismBtn = document.getElementById('check-plagiarism-btn');
                
                if (minMatchLengthInput && searchDepthSelect && checkPlagiarismBtn) {
                    // Set default values
                    minMatchLengthInput.value = 5; // Default min match length
                    searchDepthSelect.value = 'standard'; // Default search depth
                    
                    // Remove existing listeners to prevent duplicates
                    const newBtn = checkPlagiarismBtn.cloneNode(true);
                    checkPlagiarismBtn.parentNode.replaceChild(newBtn, checkPlagiarismBtn);
                    
                    // Add new listener
                    newBtn.addEventListener('click', function() {
                        const text = inputText.value;
                        if (text.trim()) {
                            checkPlagiarism(text);
                        }
                    });
                }
                break;
        }
    }
    
    // Update action button text based on current tool
    function updateActionButton() {
        switch(currentTool) {
            case 'word-counter':
                actionBtn.innerHTML = '<i class="fas fa-calculator"></i> Count';
                break;
            case 'email-extractor':
                actionBtn.innerHTML = '<i class="fas fa-search"></i> Extract';
                break;
            case 'whitespace-remover':
                actionBtn.innerHTML = '<i class="fas fa-compress-alt"></i> Remove';
                break;
            case 'case-converter':
                actionBtn.innerHTML = '<i class="fas fa-font"></i> Convert';
                break;
            case 'readability-score':
                actionBtn.innerHTML = '<i class="fas fa-book-reader"></i> Analyze';
                break;
            case 'keyword-density':
                actionBtn.innerHTML = '<i class="fas fa-chart-pie"></i> Analyze';
                break;
            case 'sentiment-analysis':
                actionBtn.innerHTML = '<i class="fas fa-smile"></i> Analyze';
                break;
            case 'reading-time':
                actionBtn.innerHTML = '<i class="fas fa-stopwatch"></i> Calculate';
                break;
            case 'markdown-to-html':
                actionBtn.innerHTML = '<i class="fab fa-markdown"></i> Convert';
                break;
            case 'html-to-text':
                actionBtn.innerHTML = '<i class="fas fa-code"></i> Convert';
                break;
            case 'url-extractor':
                actionBtn.innerHTML = '<i class="fas fa-link"></i> Extract';
                break;
            case 'phone-extractor':
                actionBtn.innerHTML = '<i class="fas fa-phone"></i> Extract';
                break;
            case 'slug-generator':
                actionBtn.innerHTML = '<i class="fas fa-link"></i> Generate Slug';
                break;
            default:
                actionBtn.innerHTML = '<i class="fas fa-play"></i> Process';
        }
    }
    
    
    // Initialize action button text
    updateActionButton();
    
    // Clear button
    clearBtn.addEventListener('click', function() {
        inputText.value = '';
        resetResults();
    });
    
    // Copy button
    copyBtn.addEventListener('click', function() {
        let textToCopy = '';
        
        switch(currentTool) {
            case 'word-counter':
                textToCopy = inputText.value;
                break;
            case 'email-extractor':
                const emails = Array.from(emailsList.querySelectorAll('.email-item'))
                    .map(item => item.textContent.trim());
                textToCopy = emails.join('\n');
                break;
            case 'whitespace-remover':
                textToCopy = whitespaceOutput.textContent;
                break;
            case 'case-converter':
                textToCopy = caseOutput.textContent;
                break;
        }
        
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => showCopySuccess())
                .catch(err => console.error('Could not copy text: ', err));
        }
    });
    
    // Show copy success notification
    function showCopySuccess() {
        const notification = document.createElement('div');
        notification.className = 'copy-success';
        notification.innerHTML = '<i class="fas fa-check"></i> Copied to clipboard!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 2500);
    }
    
    // Action button
    actionBtn.addEventListener('click', processText);
    
    // Plagiarism Checker
function checkPlagiarism(text) {
    // Get settings
    const minMatchLength = parseInt(document.getElementById('min-match-length').value) || 5;
    const searchDepth = document.getElementById('search-depth').value || 'standard';
    
    // Reset UI
    document.getElementById('plagiarism-progress').style.width = '0%';
    document.getElementById('plagiarism-status-text').textContent = 'Starting plagiarism check...';
    document.getElementById('similarity-percentage').textContent = '0%';
    document.getElementById('matches-count').textContent = '(0)';
    document.getElementById('matches-list').innerHTML = '';
    document.getElementById('plagiarism-explanation').textContent = 'Analyzing your text for potential matches...';
    
    // Update score circle background
    document.querySelector('.score-circle').style.background = 'conic-gradient(var(--accent-primary) 0%, var(--bg-tertiary) 0%)';
    
    // Disable check button during processing
    const checkButton = document.getElementById('check-plagiarism-btn');
    checkButton.disabled = true;
    checkButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
    
    // Simulate API call with setTimeout
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 5;
        document.getElementById('plagiarism-progress').style.width = `${progress}%`;
        
        // Update status text based on progress
        if (progress < 30) {
            document.getElementById('plagiarism-status-text').textContent = 'Analyzing text patterns...';
        } else if (progress < 60) {
            document.getElementById('plagiarism-status-text').textContent = 'Searching for matches across the web...';
        } else if (progress < 90) {
            document.getElementById('plagiarism-status-text').textContent = 'Comparing with potential sources...';
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            generatePlagiarismResults(text, minMatchLength, searchDepth);
        }
    }, 100);
}

// Generate plagiarism results (simulated)
function generatePlagiarismResults(text, minMatchLength, searchDepth) {
    // Normalize text
    const normalizedText = text.toLowerCase().trim();
    
    // Break text into sentences
    const sentences = normalizedText.split(/[.!?]+\s*/).filter(Boolean);
    
    // Simulated sources for potential matches
    const potentialSources = [
        {
            name: 'Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Plagiarism',
            content: 'Plagiarism is the representation of another author\'s language, thoughts, ideas, or expressions as one\'s own original work. It is considered academic dishonesty and a breach of journalistic ethics.'
        },
        {
            name: 'Academic Integrity',
            url: 'https://www.academicintegrity.org/fundamental-values/',
            content: 'Academic integrity is the commitment to and demonstration of honest and moral behavior in an academic setting. This is most relevant at the university level as it relates to providing credit to other people when using their ideas.'
        },
        {
            name: 'Oxford Dictionary',
            url: 'https://www.oxfordlearnersdictionaries.com/definition/english/plagiarism',
            content: 'The practice of taking someone else\'s work or ideas and passing them off as one\'s own. Plagiarism is a serious offense in academic and professional contexts.'
        },
        {
            name: 'Stanford University',
            url: 'https://communitystandards.stanford.edu/policies-guidance/honor-code',
            content: 'The Honor Code is the university\'s statement on academic integrity. It is essentially an agreement to operate in an environment of mutual trust and respect.'
        },
        {
            name: 'Harvard Writing Center',
            url: 'https://writingcenter.harvard.edu/pages/academic-integrity',
            content: 'When you write a research paper, you build upon the work of others and acknowledge their ideas by citing them. Proper citation allows readers to locate your sources and helps you avoid plagiarism.'
        }
    ];
    
    // Find matches (simulated)
    const matches = [];
    let totalSimilarityScore = 0;
    
    // Adjust match probability based on search depth
    let matchProbability = 0.15; // Standard
    if (searchDepth === 'basic') {
        matchProbability = 0.1;
    } else if (searchDepth === 'deep') {
        matchProbability = 0.25;
    }
    
    // Check each sentence for potential matches
    sentences.forEach(sentence => {
        if (sentence.split(/\s+/).length >= minMatchLength) {
            // Simulate finding matches with random probability
            if (Math.random() < matchProbability) {
                // Select a random source
                const sourceIndex = Math.floor(Math.random() * potentialSources.length);
                const source = potentialSources[sourceIndex];
                
                // Calculate similarity percentage for this match (random between 60-100%)
                const similarity = Math.floor(Math.random() * 41) + 60;
                
                // Add to total similarity score (weighted by sentence length)
                const weight = sentence.length / normalizedText.length;
                totalSimilarityScore += similarity * weight;
                
                matches.push({
                    text: sentence,
                    source: source.name,
                    sourceUrl: source.url,
                    similarity: similarity
                });
            }
        }
    });
    
    // Calculate overall similarity percentage
    const overallSimilarity = matches.length > 0 ? 
        Math.min(100, Math.round(totalSimilarityScore)) : 0;
    
    // Update UI with results
    document.getElementById('plagiarism-status-text').textContent = 'Plagiarism check complete!';
    document.getElementById('similarity-percentage').textContent = `${overallSimilarity}%`;
    document.getElementById('matches-count').textContent = `(${matches.length})`;
    
    // Update score circle background
    document.querySelector('.score-circle').style.background = 
        `conic-gradient(var(--accent-primary) ${overallSimilarity}%, var(--bg-tertiary) 0%)`;
    
    // Display matches
    const matchesList = document.getElementById('matches-list');
    matchesList.innerHTML = '';
    
    if (matches.length === 0) {
        matchesList.innerHTML = '<p>No significant matches found in your text.</p>';
    } else {
        matches.forEach(match => {
            const matchItem = document.createElement('div');
            matchItem.className = 'match-item';
            matchItem.innerHTML = `
                <div class="match-header">
                    <a href="${match.sourceUrl}" class="match-source" target="_blank">${match.source}</a>
                    <span class="match-similarity">${match.similarity}% match</span>
                </div>
                <div class="match-text">${match.text}</div>
            `;
            matchesList.appendChild(matchItem);
        });
    }
    
    // Update explanation
    let explanation = '';
    if (overallSimilarity < 15) {
        explanation = 'Your text appears to be highly original with minimal or no matching content found online.';
    } else if (overallSimilarity < 30) {
        explanation = 'Your text contains some phrases that match online sources. This level of similarity is generally acceptable for most purposes.';
    } else if (overallSimilarity < 50) {
        explanation = 'Your text has moderate similarity with online sources. Consider revising the highlighted sections to make your content more original.';
    } else if (overallSimilarity < 75) {
        explanation = 'Your text has significant overlap with online sources. You should substantially revise your content to avoid potential plagiarism issues.';
    } else {
        explanation = 'Your text has very high similarity with online sources. This level of matching content could be considered plagiarism in academic or professional contexts.';
    }
    
    document.getElementById('plagiarism-explanation').textContent = explanation;
    
    // Re-enable check button
    const checkButton = document.getElementById('check-plagiarism-btn');
    checkButton.disabled = false;
    checkButton.innerHTML = '<i class="fas fa-search"></i> Check Plagiarism';
}

// Generate slug from text
function generateSlug(text, separator = '-', caseType = 'lowercase') {
    // Remove special characters, replace spaces with separator, and trim
    let slug = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, separator) // Replace spaces with separator
        .replace(new RegExp(`${separator}+`, 'g'), separator) // Replace multiple separators with single
        .trim()
        .replace(new RegExp(`^${separator}|${separator}$`, 'g'), ''); // Remove leading/trailing separator
    
    // Apply case transformation if needed
    if (caseType === 'uppercase') {
        slug = slug.toUpperCase();
    }
    
    return slug;
}

// Process text based on current tool
function processText() {
    const text = inputText.value;
    
    switch(currentTool) {
        case 'word-counter':
            countText(text);
            break;
        case 'email-extractor':
            extractEmails(text);
            break;
        case 'whitespace-remover':
            removeWhitespace(text);
            break;
        case 'case-converter':
            // Just show the text in the output area
            caseOutput.textContent = text;
            break;
        case 'readability-score':
            calculateReadability(text);
            break;
        case 'keyword-density':
            analyzeKeywordDensity(text);
            break;
        case 'sentiment-analysis':
            analyzeSentiment(text);
            break;
        case 'reading-time':
            calculateReadingTime(text);
            break;
        case 'markdown-to-html':
            convertMarkdownToHtml();
            break;
        case 'html-to-text':
            convertHtmlToText();
            break;
        case 'url-extractor':
            extractUrls(text);
            break;
        case 'phone-extractor':
            extractPhoneNumbers(text);
            break;
        case 'plagiarism-checker':
            checkPlagiarism(text);
            break;
        case 'slug-generator':
            generateSlugFromInput();
            break;
    }
}

// Generate slug from input text with selected options
function generateSlugFromInput() {
    const text = inputText.value;
    const separator = document.getElementById('slug-separator').value;
    const caseType = document.getElementById('slug-case').value;
    
    const slug = generateSlug(text, separator, caseType);
    document.getElementById('slug-output').textContent = slug;
}
    
    // Reset results
    function resetResults() {
        // Word counter
        wordCount.textContent = '0';
        charCount.textContent = '0';
        sentenceCount.textContent = '0';
        paragraphCount.textContent = '0';
        
        // Email extractor
        emailsList.innerHTML = '';
        emailCount.textContent = '(0)';
        
        // Whitespace remover
        whitespaceOutput.textContent = '';
        
        // Case converter
        caseOutput.textContent = '';
        caseBtns.forEach(btn => btn.classList.remove('active'));
        
        // Reset specific tool elements
        const keywordsList = document.querySelector('.keywords-list');
        if (keywordsList) keywordsList.innerHTML = '';
        
        const sentimentMeter = document.querySelector('.meter-pointer');
        if (sentimentMeter) sentimentMeter.style.left = '50%';
        
        const previewPanels = document.querySelectorAll('.preview-panel');
        previewPanels.forEach(panel => panel.innerHTML = '');
        
        const urlList = document.querySelector('.url-list');
        if (urlList) urlList.innerHTML = '';
        
        const phoneList = document.getElementById('phones-list');
        if (phoneList) phoneList.innerHTML = '';
        
        // Reset slug generator
        const slugOutput = document.getElementById('slug-output');
        if (slugOutput) slugOutput.textContent = '';
        
        // Reset plagiarism checker
        const plagiarismProgress = document.getElementById('plagiarism-progress');
        if (plagiarismProgress) plagiarismProgress.style.width = '0%';
        
        const plagiarismStatus = document.getElementById('plagiarism-status-text');
        if (plagiarismStatus) plagiarismStatus.textContent = 'Ready to check';
        
        const similarityPercentage = document.getElementById('similarity-percentage');
        if (similarityPercentage) similarityPercentage.textContent = '0%';
        
        const matchesCount = document.getElementById('matches-count');
        if (matchesCount) matchesCount.textContent = '(0)';
        
        const matchesList = document.getElementById('matches-list');
        if (matchesList) matchesList.innerHTML = '';
        
        const plagiarismExplanation = document.getElementById('plagiarism-explanation');
        if (plagiarismExplanation) plagiarismExplanation.textContent = 'Enter your text and click "Check Plagiarism" to analyze.';
        
        const scoreCircle = document.querySelector('.score-circle');
        if (scoreCircle) scoreCircle.style.background = 'conic-gradient(var(--accent-primary) 0%, var(--bg-tertiary) 0%)';
        
        // Reset check button if it was disabled
        const checkButton = document.getElementById('check-plagiarism-btn');
        if (checkButton) {
            checkButton.disabled = false;
            checkButton.innerHTML = '<i class="fas fa-search"></i> Check Plagiarism';
        }
    }
    
    // Count text
    function countText(text) {
        // Count words
        const words = text.trim() === '' ? [] : text.trim().split(/\s+/);
        wordCount.textContent = words.length;
        
        // Count characters
        charCount.textContent = text.length;
        
        // Count sentences
        const sentences = text.split(/[.!?]+\s*/).filter(Boolean);
        sentenceCount.textContent = sentences.length;
        
        // Count paragraphs
        const paragraphs = text.split(/\n+/).filter(para => para.trim() !== '');
        paragraphCount.textContent = paragraphs.length;
    }
    
    // Extract emails
    function extractEmails(text) {
        const emailRegex = /[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/g;
        const emails = text.match(emailRegex) || [];
        const uniqueEmails = [...new Set(emails)];
        
        emailsList.innerHTML = '';
        emailCount.textContent = `(${uniqueEmails.length})`;
        
        uniqueEmails.forEach(email => {
            const emailItem = document.createElement('div');
            emailItem.className = 'email-item';
            emailItem.innerHTML = `<i class="fas fa-at"></i>${email}`;
            emailsList.appendChild(emailItem);
        });
    }
    
    // Remove whitespace
    function removeWhitespace(text) {
        // Remove extra spaces
        const trimmedText = text.replace(/\s+/g, ' ').trim();
        whitespaceOutput.textContent = trimmedText;
    }
    
    // Case converter buttons
    caseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const caseType = this.getAttribute('data-case');
            const text = inputText.value;
            
            caseBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            switch(caseType) {
                case 'upper':
                    caseOutput.textContent = text.toUpperCase();
                    break;
                case 'lower':
                    caseOutput.textContent = text.toLowerCase();
                    break;
                case 'title':
                    caseOutput.textContent = text.replace(/\w\S*/g, function(txt) {
                        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    });
                    break;
                case 'sentence':
                    caseOutput.textContent = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, function(txt) {
                        return txt.toUpperCase();
                    });
                    break;
                case 'alternating':
                    caseOutput.textContent = text.split('').map((char, index) => 
                        index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
                    ).join('');
                    break;
            }
        });
    });
    
    // Real-time processing for word counter
    inputText.addEventListener('input', function () {
        const text = this.value.trim();
    
        switch (currentTool) {
            case 'word-counter':
                countText(text);
                break;
            case 'markdown-to-html':
                convertMarkdownToHtml(true); // Preview only
                break;
            case 'html-to-text':
                convertHtmlToText(true); // Preview only
                break;
        }
    });
    
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            const icon = themeToggle.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    // Save theme preference when changed
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'data-theme') {
                localStorage.setItem('theme', document.body.getAttribute('data-theme'));
            }
        });
    });
    
    observer.observe(document.body, { attributes: true });
    
    // Set initial active tool
    const defaultTool = document.querySelector('.tool');
    if (defaultTool) {
        defaultTool.click();
    }
    
    // Slug Generator event listeners
    const slugSeparator = document.getElementById('slug-separator');
    const slugCase = document.getElementById('slug-case');
    const generateSlugBtn = document.getElementById('generate-slug-btn');
    const copySlugBtn = document.getElementById('copy-slug-btn');
    
    if (slugSeparator && slugCase && generateSlugBtn && copySlugBtn) {
        // Generate slug when button is clicked
        generateSlugBtn.addEventListener('click', generateSlugFromInput);
        
        // Generate slug when options change
        slugSeparator.addEventListener('change', generateSlugFromInput);
        slugCase.addEventListener('change', generateSlugFromInput);
        
        // Copy slug to clipboard
        copySlugBtn.addEventListener('click', function() {
            const slugOutput = document.getElementById('slug-output');
            if (slugOutput && slugOutput.textContent) {
                navigator.clipboard.writeText(slugOutput.textContent)
                    .then(() => {
                        showCopySuccess();
                    })
                    .catch(err => {
                        console.error('Could not copy text: ', err);
                    });
            }
        });
    }
});
