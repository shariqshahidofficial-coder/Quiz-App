const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const themeToggle = document.getElementById('theme-toggle');
const playerNameInput = document.getElementById('player-name');
const topicGrid = document.getElementById('topic-grid');
const highScoreEl = document.getElementById('high-score');
const scoreEl = document.getElementById('score');
const qIndexEl = document.getElementById('q-index');
const qTotalEl = document.getElementById('q-total');
const timerEl = document.getElementById('timer');
const progressFill = document.getElementById('progress-fill');
const questionText = document.getElementById('question-text');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultTopic = document.getElementById('result-topic');
const resultPlayer = document.getElementById('result-player');
const resultScore = document.getElementById('result-score');
const resultMsg = document.getElementById('result-msg');
const retryBtn = document.getElementById('retry-btn');
const topicsBtn = document.getElementById('topics-btn');
const timeUpOverlay = document.getElementById('alarm-overlay');
const dismissBtn = document.getElementById('dismiss-alarm');

const TOPICS = [
    { id: 'html', name: 'HTML', tag: 'Markup', color: '#f97316' },
    { id: 'css', name: 'CSS', tag: 'Styling', color: '#3b82f6' },
    { id: 'js', name: 'JavaScript', tag: 'Scripting', color: '#eab308' },
    { id: 'react', name: 'React', tag: 'UI library', color: '#06b6d4' },
    { id: 'next', name: 'Next.js', tag: 'React framework', color: '#6b7280' },
    { id: 'ts', name: 'TypeScript', tag: 'Typed JS', color: '#7c3aed' },
    { id: 'node', name: 'Node.js', tag: 'Backend', color: '#22c55e' },
    { id: 'express', name: 'Express', tag: 'Node framework', color: '#0ea5e9' },
    { id: 'postgres', name: 'PostgreSQL', tag: 'Database', color: '#0284c7' }
];

const QUESTIONS = {
    html: [
        { q: 'You want the biggest heading possible on the page. Which tag do you reach for?', options: ['<h6>', '<heading>', '<h1>', '<head>'], answer: 2 },
        { q: 'Your image takes time to load and you want a fallback text. Which attribute saves you?', options: ['title', 'src', 'href', 'alt'], answer: 3 },
        { q: 'A friend is typing a paragraph and needs to break the line in the middle. Which tag is it?', options: ['<break>', '<br>', '<lb>', '<hr>'], answer: 1 },
        { q: 'You are making a shopping list with bullet points. Which tag should you use?', options: ['<ol>', '<li>', '<list>', '<ul>'], answer: 3 },
        { q: 'You need to link to another page. Which tag wraps the clickable text?', options: ['<a>', '<link>', '<href>', '<url>'], answer: 0 },
        { q: 'A simple checkbox on your form — what is the correct input type?', options: ['type="box"', 'type="checkbox"', 'type="check"', 'type="toggle"'], answer: 1 },
        { q: 'Which one is the proper HTML5 doctype? I always forget this one.', options: ['<!DOCTYPE html>', '<!DOCTYPE html5>', '<html doctype>', '<doctype>'], answer: 0 },
        { q: 'You are building an employee table. Which tag starts a new row?', options: ['<td>', '<th>', '<tr>', '<row>'], answer: 2 },
        { q: 'Time to add a JavaScript file to the page. Which tag does that?', options: ['<javascript>', '<script>', '<js>', '<code>'], answer: 1 },
        { q: 'What does the lang attribute on the <html> tag actually tell the browser?', options: ['The primary language of the page', 'The author of the page', 'The encoding used', 'The version of HTML'], answer: 0 }
    ],
    css: [
        { q: 'You want the text inside a button to turn red. Which property is it?', options: ['font-color', 'text-style', 'color', 'font-style'], answer: 2 },
        { q: 'Your card content keeps touching the edges. What adds breathing room on the inside?', options: ['margin', 'padding', 'spacing', 'inset'], answer: 1 },
        { q: 'You want items to shrink and grow into a row. What display value do you set?', options: ['display: block', 'display: inline', 'display: flex', 'display: static'], answer: 2 },
        { q: 'The footer keeps scrolling away with the page. Which position value pins it to the screen?', options: ['absolute', 'relative', 'static', 'fixed'], answer: 3 },
        { q: 'Your heading looks thin and weak. Which property makes the letters heavier?', options: ['font-style', 'text-bold', 'font-weight', 'text-weight'], answer: 2 },
        { q: 'You need to select the element with id="hero". Which selector is right?', options: ['.hero', '#hero', '*hero', 'hero()'], answer: 1 },
        { q: 'All elements carrying class "box" — how do you target them in one go?', options: ['#box', '*box', '.box', 'box.'], answer: 2 },
        { q: 'Between padding and margin, which one pushes the other elements away?', options: ['padding', 'margin', 'both', 'neither'], answer: 1 },
        { q: 'You want an element to slowly fade out. Which property does the job?', options: ['transparency', 'alpha', 'opacity', 'visible'], answer: 2 },
        { q: 'What does CSS actually stand for? A classic interview opener.', options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'], answer: 1 }
    ],
    js: [
        { q: 'You are declaring a value you never want reassigned. Which keyword fits best?', options: ['let', 'var', 'const', 'static'], answer: 2 },
        { q: 'What does this print in the console?  console.log("2" + 2)', options: ['4', '"22"', '22', 'Error'], answer: 1 },
        { q: 'Strict equality — which operator is that?', options: ['==', '===', '=', '!='], answer: 1 },
        { q: 'You have an array and want to add an item at the end. Which method is it?', options: ['push()', 'pop()', 'shift()', 'unshift()'], answer: 0 },
        { q: 'The server sent you JSON as a plain string. How do you turn it into a real object?', options: ['JSON.stringify()', 'JSON.toObject()', 'JSON.parse()', 'parseJSON()'], answer: 2 },
        { q: 'You ask typeof [1, 2, 3] and the console says... what? A classic gotcha.', options: ['"array"', '"list"', '"object"', '"number"'], answer: 2 },
        { q: 'Remove the very last element from an array — what is the method?', options: ['shift()', 'pop()', 'splice(0)', 'remove()'], answer: 1 },
        { q: 'Which of these lines would throw a SyntaxError if you actually ran it?', options: ['let x = 5', 'var x = 5', 'const x = 5', 'integer x = 5'], answer: 3 },
        { q: 'You want something to run once, three seconds from now. Which function?', options: ['setInterval()', 'setTimeout()', 'delay()', 'wait()'], answer: 1 },
        { q: 'You are waiting on a fetch and want clean, readable code. What is the modern way?', options: ['async/await', 'try/finally', 'callback hell', 'go/return'], answer: 0 }
    ],
    react: [
        { q: 'You need a counter that updates the UI. Which hook is your go-to?', options: ['useEffect', 'useState', 'useRef', 'useContext'], answer: 1 },
        { q: 'Fetching data when the component mounts? Which hook is the standard place?', options: ['useState', 'useMemo', 'useEffect', 'useReducer'], answer: 2 },
        { q: 'Your list items keep logging a warning in the console. Which prop are you missing?', options: ['id', 'name', 'key', 'ref'], answer: 2 },
        { q: 'Passing data from a parent component down to a child — how do you do it?', options: ['props', 'state', 'context', 'events'], answer: 0 },
        { q: 'A button that does something when clicked. What is the JSX attribute?', options: ['onClick', 'onclick', 'onPress', 'handleClick'], answer: 0 },
        { q: 'JSX is not plain HTML. In one line, what is it really?', options: ['A database', 'A JavaScript syntax extension for UI', 'A CSS preprocessor', 'A build tool'], answer: 1 },
        { q: 'Your component keeps showing stale data after updates. The Virtual DOM is React\'s way of...?', options: ['Rewriting the whole page every render', 'Keeping a lightweight copy of the DOM for fast updates', 'Storing data in the cloud', 'Compiling CSS for you'], answer: 1 },
        { q: 'Which command scaffolds a fresh React project for you?', options: ['npm create react-app', 'npx create-react-app', 'npm new react', 'react init'], answer: 1 },
        { q: 'You built component Foo in its own file. How do you import it by default?', options: ['import Foo from "./Foo"', 'import { Foo } from "./Foo"', 'require Foo', 'using Foo'], answer: 0 },
        { q: 'Timers, subscriptions, API calls — what replaces the old componentDidMount?', options: ['useLayoutEffect', 'useEffect', 'useState', 'useMemo'], answer: 1 }
    ],
    next: [
        { q: 'In the App Router, where do you drop your page files?', options: ['pages/', 'app/', 'routes/', 'src/'], answer: 1 },
        { q: 'Which npm command spins up the dev server?', options: ['npm start', 'npm run dev', 'npm serve', 'next start dev'], answer: 1 },
        { q: 'Pages get rendered on the server before reaching the browser. What is that called?', options: ['Single Site Rendering', 'Server-Side Rendering', 'Static State Response', 'Standard Style Rules'], answer: 1 },
        { q: 'You open a fresh project and spot a layout.js file. What does it define?', options: ['The database schema', 'Shared UI that wraps every page', 'Only the home page', 'A CSS theme'], answer: 1 },
        { q: 'You want to use useState in the App Router. What do you add at the top of the file?', options: ['"use client"', '"use server"', '"use client-side"', 'client()'], answer: 0 },
        { q: 'You want static pages that quietly rebuild after a while. What is that hybrid feature called?', options: ['Incremental Static Regeneration', 'Instant Server Response', 'Inline Style Rendering', 'Indexed Static Routing'], answer: 0 },
        { q: 'You are building a blog with URLs like /posts/1. What is the file name pattern?', options: ['[slug]/page.js', ':(slug)/page.js', '*slug/page.js', '<slug>.js'], answer: 0 },
        { q: 'You want to set the page title and description. Where does that go in the App Router?', options: ['<Meta> tag', 'The metadata export', '<HeadInfo> tag', '<PageInfo> tag'], answer: 1 },
        { q: 'Next.js does not need a router config file. What kind of routing does it use?', options: ['File-based routing', 'Config-based routing', 'Database routing', 'API routing'], answer: 0 },
        { q: 'What is the command to create an optimized production build?', options: ['npm run dev', 'npm run build', 'npm compile', 'next dev'], answer: 1 }
    ],
    ts: [
        { q: 'You are typing a function parameter and want it to be a number. What do you write?', options: ['param: number', 'param = number', 'number param', 'param => number'], answer: 0 },
        { q: 'What does TypeScript actually give you on top of JavaScript?', options: ['CSS support', 'Static type checking', 'A new browser', 'A built-in database'], answer: 1 },
        { q: 'You want to describe a User object with name and age. Which keyword fits?', options: ['type User', 'interface User', 'class User', 'enum User'], answer: 1 },
        { q: 'A variable that could be a string OR a number. What is that called?', options: ['A union type', 'An any type', 'An object type', 'A generic'], answer: 0 },
        { q: 'How do you type an array full of strings?', options: ['string[]', 'array<string>', 'strings', 'list<string>'], answer: 0 },
        { q: 'A function that does its work and returns nothing. What is the return type?', options: ['null', 'undefined', 'void', 'never'], answer: 2 },
        { q: 'You genuinely do not care about a value and want the errors to stop. Which type?', options: ['unknown', 'any', 'never', 'void'], answer: 1 },
        { q: 'Your API returns an optional field. Which character marks it optional?', options: ['!', '?', '*', '~'], answer: 1 },
        { q: 'Which command turns your .ts files into JavaScript?', options: ['node', 'tsc', 'webpack', 'npm'], answer: 1 },
        { q: 'What is the difference between any and unknown? Why is unknown safer?', options: ['There is no difference', 'unknown forces a type check before you use it', 'any blocks all access', 'unknown only works for numbers'], answer: 1 }
    ],
    node: [
        { q: 'What is Node.js, in one sentence?', options: ['A CSS framework', 'A JavaScript runtime built on Chrome\'s V8', 'A database engine', 'A web browser'], answer: 1 },
        { q: 'You just wrote server.js. What command runs it?', options: ['node server.js', 'run server.js', 'npm server.js', 'js server.js'], answer: 0 },
        { q: 'You need to read a file from disk. Which built-in module do you import?', options: ['http', 'fs', 'path', 'os'], answer: 1 },
        { q: 'What does npm actually stand for?', options: ['Node Package Manager', 'Node Program Module', 'New Process Manager', 'No Package Modifier'], answer: 0 },
        { q: 'Async operations do not block the thread because of... what?', options: ['A faster CPU', 'The event loop', 'More RAM', 'Caching'], answer: 1 },
        { q: 'Your script needs command line arguments. Where do they live?', options: ['process.env', 'process.argv', 'process.cwd', 'process.args'], answer: 1 },
        { q: 'How do you load the http module so you can start using it?', options: ['const http = require(\'http\')', 'import http from \'node\'', 'use http', 'get http'], answer: 0 },
        { q: 'Which global object gives you info about the running process?', options: ['window', 'document', 'process', 'globalThis.document'], answer: 2 },
        { q: 'Reading a file with readFileSync blocks everything else. What is the async version?', options: ['fs.readFile', 'fs.read', 'file.read()', 'fs.async()'], answer: 0 },
        { q: 'In a CommonJS file, what does require() actually do?', options: ['Deletes a module', 'Imports another module', 'Creates a server', 'Installs a package'], answer: 1 }
    ],
    express: [
        { q: 'Which package name do you install to get Express?', options: ['expressjs', 'express', 'express-server', 'node-express'], answer: 1 },
        { q: 'You are creating the app instance. What is the exact call?', options: ['express()', 'new Express()', 'Express.create()', 'createApp()'], answer: 0 },
        { q: 'A GET request hits the homepage. Which method handles it?', options: ['app.get()', 'app.post()', 'app.send()', 'app.fetch()'], answer: 0 },
        { q: 'You want to send a JSON object back to the client. Which method?', options: ['res.sendJSON()', 'res.json()', 'res.data()', 'res.parse()'], answer: 1 },
        { q: 'Which method finally makes your server listen on a port?', options: ['app.start()', 'app.run()', 'app.listen()', 'server.on()'], answer: 2 },
        { q: 'How would you explain a middleware function to a junior dev?', options: ['A database query', 'A function that processes requests in the pipeline', 'An HTML component', 'A CSS class'], answer: 1 },
        { q: 'You defined a route /users/:id. Where does the id value end up?', options: ['req.query', 'req.params', 'req.body', 'req.headers'], answer: 1 },
        { q: 'Express 4+ has a built-in way to parse JSON bodies. What is it?', options: ['express.json()', 'express.body()', 'express.parse()', 'express.data()'], answer: 0 },
        { q: 'You forgot to set a status code and used res.send(). What did the client get?', options: ['201', '404', '500', '200'], answer: 3 },
        { q: 'A URL like /search?q=cats — where do the search params live?', options: ['req.params', 'req.query', 'req.body', 'req.url.query'], answer: 1 }
    ],
    postgres: [
        { q: 'In one line, what is PostgreSQL?', options: ['A JavaScript framework', 'An open-source relational database', 'A CSS preprocessor', 'A hosting service'], answer: 1 },
        { q: 'Which terminal command opens the psql prompt?', options: ['connect db', 'psql', 'pg run', 'db -u'], answer: 1 },
        { q: 'You need a brand new table called users. What is the SQL?', options: ['CREATE TABLE users', 'MAKE TABLE users', 'NEW TABLE users', 'ADD TABLE users'], answer: 0 },
        { q: 'A column that holds whole numbers. Which type do you pick?', options: ['TEXT', 'VARCHAR', 'BOOLEAN', 'INTEGER'], answer: 3 },
        { q: 'You only want rows where age is over 18. Which clause filters them?', options: ['WHERE', 'ORDER BY', 'GROUP BY', 'HAVING ALL'], answer: 0 },
        { q: 'Which keyword pulls data out of a table?', options: ['GET', 'SHOW', 'SELECT', 'FIND'], answer: 2 },
        { q: 'You want every user to have a unique id. Which constraint is that?', options: ['UNIQUE ONLY', 'PRIMARY KEY', 'NOT NULL', 'AUTO INDEX'], answer: 1 },
        { q: 'The users table is a complete mess. How do you get rid of it entirely?', options: ['DELETE TABLE users', 'REMOVE TABLE users', 'DROP TABLE users', 'CLEAR TABLE users'], answer: 2 },
        { q: 'You need to know how many orders exist in the table. Which function?', options: ['SUM(*)', 'TOTAL(*)', 'COUNT(*)', 'AVG(*)'], answer: 2 },
        { q: 'Users need a brand new column called email. What is the statement?', options: ['ALTER TABLE users ADD COLUMN email TEXT', 'UPDATE TABLE users ADD email', 'INSERT COLUMN email', 'CREATE COLUMN email'], answer: 0 }
    ]
};

const TIME_LIMIT = 20;

let questions = [];
let currentIndex = 0;
let score = 0;
let timer = null;
let timeLeft = TIME_LIMIT;
let selectedTopic = 'html';
let isDarkMode = true;

function getHighScore() {
    return JSON.parse(localStorage.getItem('neoQuizHigh')) || { name: '---', score: 0 };
}

function setHighScore(name, score) {
    localStorage.setItem('neoQuizHigh', JSON.stringify({ name, score }));
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function init() {
    renderTopics();
    renderHighScore();
    themeToggle.addEventListener('click', toggleTheme);
    nextBtn.addEventListener('click', nextQuestion);
    retryBtn.addEventListener('click', () => startQuiz(selectedTopic));
    topicsBtn.addEventListener('click', showStart);
    dismissBtn.addEventListener('click', () => timeUpOverlay.classList.add('hidden'));
}

function renderTopics() {
    topicGrid.innerHTML = '';
    TOPICS.forEach(topic => {
        const card = document.createElement('button');
        card.className = 'topic-card';
        card.style.setProperty('--accent', topic.color);
        card.innerHTML = `
            <span class="topic-badge">${topic.name}</span>
            <span class="topic-tag">${topic.tag}</span>
            <span class="topic-arrow">&#8594;</span>
        `;
        card.addEventListener('click', () => {
            selectedTopic = topic.id;
            startQuiz(topic.id);
        });
        topicGrid.appendChild(card);
    });
}

function renderHighScore() {
    const hs = getHighScore();
    highScoreEl.textContent = hs.name !== '---' ? `Best score so far: ${hs.name} - ${hs.score}/${10}` : 'No scores yet. Be the first!';
}

function startQuiz(topicId) {
    const name = playerNameInput.value.trim();
    if (!name) {
        alert('Please enter your name first.');
        playerNameInput.focus();
        return;
    }
    selectedTopic = topicId;
    questions = shuffle(QUESTIONS[topicId]);
    currentIndex = 0;
    score = 0;
    qTotalEl.textContent = questions.length;
    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    renderQuestion();
}

function renderQuestion() {
    const q = questions[currentIndex];
    qIndexEl.textContent = currentIndex + 1;
    scoreEl.textContent = score;
    questionText.textContent = q.q;
    optionsEl.innerHTML = '';

    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => selectAnswer(i, btn));
        optionsEl.appendChild(btn);
    });

    progressFill.style.width = ((currentIndex) / questions.length * 100) + '%';
    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timeLeft = TIME_LIMIT;
    timerEl.textContent = timeLeft;
    timerEl.style.color = '';
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 5) timerEl.style.color = 'var(--accent-neon)';
        if (timeLeft <= 0) {
            clearInterval(timer);
            timeUpOverlay.classList.remove('hidden');
            lockOptions(null);
        }
    }, 1000);
}

function selectAnswer(i, btn) {
    clearInterval(timer);
    lockOptions(i);
    const q = questions[currentIndex];
    const correct = q.answer === i;
    if (correct) {
        score++;
        btn.classList.add('correct');
        scoreEl.textContent = score;
    } else {
        btn.classList.add('wrong');
        const correctBtn = optionsEl.children[q.answer];
        correctBtn.classList.add('correct');
    }
}

function lockOptions(selected) {
    const btns = optionsEl.children;
    for (let i = 0; i < btns.length; i++) {
        const b = btns[i];
        b.disabled = true;
        if (selected !== null && i !== selected) {
            b.classList.add('muted');
        }
    }
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < questions.length) {
        renderQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    clearInterval(timer);
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    const name = playerNameInput.value.trim();
    const topic = TOPICS.find(t => t.id === selectedTopic);
    resultTopic.textContent = topic.name;
    resultPlayer.textContent = `${name}, you scored:`;
    resultScore.textContent = `${score}/${questions.length}`;
    const pct = score / questions.length;
    if (pct === 1) resultMsg.textContent = 'Perfect score! You are a coding legend.';
    else if (pct >= 0.7) resultMsg.textContent = 'Great job! You really know your stuff.';
    else if (pct >= 0.4) resultMsg.textContent = 'Not bad! A little practice and you will be there.';
    else resultMsg.textContent = 'Tough luck. Try another topic and keep learning!';
    const hs = getHighScore();
    if (score > hs.score) {
        setHighScore(name, score);
        resultMsg.textContent += ' This is a new best score!';
    }
    renderHighScore();
}

function showStart() {
    resultScreen.classList.add('hidden');
    quizScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('light-mode', !isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
}

init();
