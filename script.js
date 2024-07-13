const questions = ['When I am tense I notice where the tension is located in my body. ',
'I notice when I am uncomfortable in my body. ',
'I notice where in my body I am comfortable. ',
'I notice changes in my breathing, such as whether it slows down or speeds up. ',
'I ignore physical tension or discomfort until they become more severe.',
'I distract myself from sensations of discomfort. ',
'When I feel pain or discomfort, I try to power through it. ',
'I try to ignore pain ',
'I push feelings of discomfort away by focusing on something ',
'When I feel unpleasant body sensations, I occupy myself with something else so I don’t have to feel them. ',
'When I feel physical pain, I become upset. ',
'I start to worry that something is wrong if I feel any discomfort. ',
'I can notice an unpleasant body sensation without worrying about it. ',
'I can stay calm and not worry when I have feelings of discomfort or pain. ',
'When I am in discomfort or pain I can’t get it out of my mind ',
'I can pay attention to my breath without being distracted by things happening around me. ',
'I can maintain awareness of my inner bodily sensations even when there is a lot going on around me.',
'When I am in conversation with someone, I can pay attention to my posture. ',
'I can return awareness to my body if I am distracted. ',
'I can refocus my attention from thinking to sensing my body. ',
'I can maintain awareness of my whole body even when a part of me is in pain or discomfort.',
'I am able to consciously focus on my body as a whole. ',
'I notice how my body changes when I am angry. ',
'When something is wrong in my life I can feel it in my body. ',
'I notice that my body feels different after a peaceful experience. ',
'I notice that my breathing becomes free and easy when I feel comfortable. ',
'I notice how my body changes when I feel happy / joyful. ',
'When I feel overwhelmed I can find a calm place inside. ',
'When I bring awareness to my body I feel a sense of calm. ',
'I can use my breath to reduce tension. ',
'When I am caught up in thoughts, I can calm my mind by focusing on my body/breathing. ',
'I listen for information from my body about my emotional state. ',
'When I am upset, I take time to explore how my body feels. ',
'I listen to my body to inform me about what to do. ',
'I am at home in my body. ',
'I feel my body is a safe place. ',
'I trust my body sensations.']

const scoring = {"1. Noticing":{"description":" Awareness of uncomfortable, comfortable, and neutral body sensations","scoring":[1 ,2 ,3 ,4 ]},
"2. Not-Distracting":{"description":" Tendency not to ignore or distract oneself from sensations of pain or discomfort","scoring":[-5 ,-6,-7,-8,-9,-10 ]},
"3. Not-Worrying":{"description":" Tendency not to worry or experience emotional distress with sensations of pain or discomfort","scoring":[-11 ,-12 ,13 ,14 ,-15 ]},
"4. Attention Regulation":{"description":" Ability to sustain and control attention to body sensations","scoring":[16 ,17 ,18 ,19 ,20 ,21 ,22 ]},
"5. Emotional Awareness":{"description":" Awareness of the connection between body sensations and emotional states","scoring":[23 ,24 ,25 ,26 ,27 ]},
"6. Self-Regulation":{"description":" Ability to regulate distress by attention to body sensations","scoring":[28 ,29 ,30 ,31 ]},
"7. Body Listening":{"description":" Active listening to the body for insight","scoring":[32 ,33 ,34 ]},
"8. Trusting":{"description":" Experience of one’s body as safe and trustworthy","scoring":[35 ,36 ,37]}} 

const containerElm = document.querySelector('#container');

window.answers = [];

const pickChoice = (ind,choice)=>{
    window.answers[ind] = choice;
    console.log(`#q-${ind} .choice`);
    document.querySelectorAll(`#q-${ind} .choice`).forEach(elm=>{
        console.log(elm);
        console.log(elm.innerText);
        if (elm.innerText=== (choice+'')){
            elm.classList.add('selected');
        }else{
            elm.classList.remove('selected');
        }
    })
    calculate();
}

const choice = (ind,choice)=>{
    const choiceElm = document.createElement('button');
    choiceElm.classList.add('choice')
    choiceElm.innerText=choice;
    choiceElm.addEventListener('click',()=>pickChoice(ind,choice));
    return choiceElm;
}

const question = (q,ind)=>{
    console.log(q,ind);
    const qElm = document.createElement('div');
    qElm.id=`q-${ind}`
    qElm.classList.add('question-wrap');
    const choices = [0,1,2,3,4,5].map(n=>choice(ind,n));
    qElm.innerHTML = `<div class="question">${q}</div><div class="choices-wrap"></div>`
    choices.forEach(c=>qElm.querySelector(".choices-wrap").append(c))  
    return qElm;  
}

const calculate = ()=>{
    let output=''
    for (var scale in scoring){
        let sum=0;
        let n=0;
        console.log(scale);
        const scoring_items = scoring[scale]['scoring']
        scoring_items.forEach(item=>{
            const thisAnswer = window.answers[Math.abs(item)-1];
            const score = (item>0)?thisAnswer:(5-thisAnswer);

            sum += score || 0;
            n++;
        })
        output+='<p>'+scale+' : '+(sum/n).toFixed(2)+'</p>';
    }
    document.getElementById('output').innerHTML = output;
}

const getCurrentQuestion = ()=>{
    return document.querySelector(`#q-${window.currentQuestionInd}`);
}

const updateCurrentQuestion =()=>{
    document.querySelectorAll('.question-wrap').forEach(elm=>elm.classList.remove('active'));
    console.log(window.currentQuestionInd);
    const currentQuestionElm = getCurrentQuestion();
    currentQuestionElm.classList.add('active');
    window.scrollTo(0,currentQuestionElm.offsetTop-200);
}

const nextQuestion = ()=>{
    window.currentQuestionInd = Math.min(window.currentQuestionInd+1,questions.length-1);
        updateCurrentQuestion();
}

const questionElms = questions.map(question);
questionElms.forEach(elm=>containerElm.append(elm))

window.currentQuestionInd = 0;
updateCurrentQuestion();
document.addEventListener('keydown',(e)=>{
    
    if (e.key=== "ArrowUp"){
        window.currentQuestionInd = Math.max(window.currentQuestionInd-1,0);
        updateCurrentQuestion();
    e.preventDefault();
 }
    if (e.key=== "ArrowDown"){
        nextQuestion();
        e.preventDefault();
    }

    if (~'012345'.indexOf(e.key)){
        const choiceInd = parseInt(e.key);
        [...getCurrentQuestion().querySelectorAll('.choice')][choiceInd].click();
        nextQuestion();

    }

    
})

