// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
import { render, h } from "preact";
import SocialBar from 'shared/js/SocialShare';
import {$, $$} from 'shared/js/util';
import RelatedContent from "shared/js/RelatedContent";
import {gsap, Sine} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
// import Brother from "./Brother";
import store, { ACTION_SET_SECTIONS, fetchData } from "./store";
import {SwitchTransition, Transition, TransitionGroup} from "react-transition-group";
import { BubbleIcons, CloseIcon, IconArrow, Logo, ScrollDown} from "./Icons";
import {Provider, useSelector, useDispatch} from "react-redux";
import { useEffect, useRef, useState } from "preact/hooks";
// import {SmoothProvider} from "react-smooth-scrolling";

const assetsPath = "<%= path %>";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({
    duration:1,
    ease: 'sine.inOut'
});

const setHtml = (html) => ({dangerouslySetInnerHTML:{__html: html}});

const Container = ({children, className}) => {
    return (
        // <div className="md:container  md:mx-auto">
        <div className={`GlabsContainer ${className}`}>
            <div className="container">
                {children}
            </div>
        </div>
    )
}
const Boxed = ({children, className}) => {
    return (
        // <div className="md:container  md:mx-auto">
        <div className={`boxed ${className}`}>
            <div className="labs-content">
                {children}

            </div>
        </div>
    )
}
// const FlexContainer = (props) => {
const FlexContainer = ({children, className}) => {
    return (
        <div className={`flex-container ${className}`} >
            {children}
        </div>
    )
}



const Loading = () => 
    <FlexContainer className="loading">
        <div style={{width: 300}}>
            <img src={`${assetsPath}/glab_logo.svg`} />
        </div>
    </FlexContainer>

const HeaderWithLogo = () => {
    const content = useSelector(s=>s.content);

    return (
        <header>
            <div className="">

                <div className="bg"
                    style={`background-image: linear-gradient(360deg, rgba(0,0,0,0.9) 10%, transparent 50%), url('${assetsPath}/header.jpg');`}>
                    
                    <div className="title-wrap">
                        <div class="title">
                            <h1 className="text-bg" {...setHtml(content.headline)}></h1>
                            <div className="subhead" {...setHtml(content.subhead)}></div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </header>        
    )
}

const Header = () => {
    const content = useSelector(s=>s.content);

    return (
        <div className="header" >
            <div className="bg" style={{
            backgroundImage: `url(${assetsPath}/header.png), linear-gradient(0deg, #003575 0px, #003575 50%, #E7F2F0 50%)`
        }}>

            {/* <Container className="title-block">
                <div className="client-tab">
                    <h1 {...setHtml(content.title)}></h1>
                </div>
                <div>
                    <div className="main-title" {...setHtml(content.headline)}>
                        <h1 {...setHtml(content.headline)}></h1>
                    </div>

                </div>

            </Container> */}

            </div>
            <div>
                    <div class="title">
                            <h1 className="text-bg" {...setHtml(content.headline)}></h1>
                            <div className="subhead" {...setHtml(content.subhead)}></div>
                            <ScrollDown />
                        </div>
                    </div>            
        </div>        
    )
}

const Attribution = ({content}) => {
    return (
        <div className="attribution">
            <p>Paid for by 
                <a className="mt-4 block" href={content.logoLink} target="_blank">
                    <img src={`${assetsPath}/logo.png`} className="logo" />
                </a>
            </p>
            <div className="about-content" {...setHtml(content.aboutLink)} />
        </div>
    )
}

const Footer = ({content, related, shareUrl}) => {

    return (
        <section className="footer">
            <div className="labs-content">
                {/* <div className="break"><span /><span /><span /><span /></div> */}

                <div className="cta-wrap">
                    <div className="cta" {...setHtml(content.cta)} />
                    <div className="disc" {...setHtml(content.disc)}></div>

                </div>
                

                <div className="share">
                    <SocialBar title={content.shareTitle} url={shareUrl} />
                </div>
                <div className="related">
                    <RelatedContent cards={related} />
                </div>
            </div>
        </section>
    )
}

const StandfirstWithBorder = ({content}) => {

    return (
        <section className="standfirst">
            <div className="labs-content" >
                <div className="lines">

                <div className="body" {...setHtml(content.standfirst)}>

                </div>
                </div>
                <ScrollDown />
            </div>
        </section>
    )
}

const Standfirst = ({content}) => {

    return (
        <div className="standfirst">
                <div className="labs-content" {...setHtml(content.standfirst)}></div>
        </div>
    )
}

const Intro = ({content}) => {

    return (
        <div className="intro">
                <div className="labs-content" {...setHtml(content.intro)}></div>
        </div>
    )
}


const SmoothScroll = ({children}) => {
    const app = useRef();
    const [pos, setPos] = useState(window.scrollY);
    useEffect(()=>{
        window.addEventListener('scroll', (e) => {
            e.preventDefault();
            const dy = pos-window.scrollY;
            console.log(Math.max(-2100, dy));
            setPos(window.scrollY);
            gsap.to(app.current, {duration: 0.5, y: Math.max(-2100, dy), ease: 'sine.out'});
        });
    },[])
    return (
        <div ref={app}>
            {children}
        </div>
    )
}



const MainBody = ({children}) => {
    const ref = useRef();
    return (
        <div className="main" ref={ref}>
            {children}
        </div>
    )
}

const SectionHero = ({id, title}) => {
    const ref = useRef();
    useEffect(()=>{
        const img = ref.current.querySelector('.vis img');
        // console.log(img)
        setTimeout(()=>{

            gsap.from(img, {
                scrollTrigger: {
                    trigger: ref.current.querySelector('.img'),
                    scrub: true,
                    start: 'top bottom',
                    end: 'top 5%',
                },
                scale: 1.2, 
                y: 100,
                ease: 'sine.out'
            })
        },300)
    },[]);
    return (
        <div className={`section-hero ${id}`} ref={ref}>
            <div className="vis">
                <div className="img">
                    <img src={`${assetsPath}/${id}.jpg`} alt />
                    <div className="overlay"></div>

                </div>
                <header>
                    <h1>{title}</h1>
                </header>
            </div>
        </div>
    )
}

const QuestionOption = (props) => {
    return (
        <div className="option-item">
            <input type="radio" name={props.name} id={`${props.name}${props.index}`} value={props.value} onChange={props.onChange} />
            <label htmlFor={`${props.name}${props.index}`}>
                {props.label}
            </label>
        </div>
    )
}

const Question = ({data, index, onDone, id}) => {
    const ref = useRef();
    const [valid, setValid] = useState(false);

    const handleDone = (e) => {
        e.preventDefault();
        if (ref.current.querySelector(`input:checked`)) {
            onDone(index, ref.current.querySelector(`input:checked`).value);
        }
    }

    const handleChange = () => {
        if (ref.current.querySelector(`input:checked`)) {
            setValid(true);
        } else {
            setValid(false);
            
        }
    }

    useEffect(()=>{
        if (!index) return;
        ref.current.scrollIntoView({behavior: 'smooth'});
    },[]);

    useEffect(()=>{
        // let t = ref.current.querySelector('.title');
        // gsap.from(t, {
        //     scrollTrigger: {
        //         trigger: t,
        //     },
        //     alpha: 0
        // });
        // t = ref.current.querySelector('.options');
        // gsap.timeline({ 
        //     paused: false,
        //     scrollTrigger: {
        //         trigger: t,
        //         start:'top 70%',
        //         end:'top 50%',
        //         scrub: true
        //     },
        // }).from(ref.current.querySelectorAll('.option-item'), {
        //     duration: 1,
        //     y: '40',
        //     opacity: 0,
        //     ease: 'sine.out',
        //     // stagger: 0.3,            
        // });
    },[])

    return (
        <div className="question" 
            ref={ref}
            id={id}
            style={{
                '--bg-color': data.bgColor,
                '--selected-color': data.questionColor,
                '--option-color': data.optionColor,
                '--label-bg': data.labelBg,
            }}
        >
            <div className="inner">
                <div className="counter">
                    <p>{data.counter}</p>
                </div>
                <div className="img">
                    <div className="illo">
                        <img src={`${assetsPath}/illo-0${index+1}.svg`} alt="" />
                    </div>
                    <div className="fg">
                        <img src={`${assetsPath}/q-0${index+1}.png`} alt="" />
                    </div>
                </div>
                <div className="title">
                    <p>{data.text}</p>
                </div>
                <div className="options">
                    {data.options.map((v,i)=>
                        <QuestionOption 
                            index={i}
                            key={i}
                            value={data.ans[i]}
                            label={v}
                            name={data.key}
                            onChange={handleChange}
                        />
                    )}
                </div>
                <div className="control">
                    <button className="done" onClick={handleDone}
                        disabled={!valid}
                        aria-disabled={!valid}
                    >
                        <IconArrow />
                    </button>
                </div>
            </div>
        </div>
    )
}

var playlists = {
    "rock": {
        playlist: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX2pyZi2N4UlV',
        label: 'Rock'
    },
    "pop":{
        playlist: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX62MXOs1I1Al',
        label: 'Pop'
    },
    "alt":{
        playlist: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXdY7r8WIP6WR',
        label: 'Alt'
    },
    "fav":{
        playlist: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXaW6vV1V1vmM',
        label: 'Easy-going favourites'
    }
}



const QuestionPanel = ({questions}) => {
    const ref = useRef();
    const scrollTargets = ['q2','q3', 'q4', 'q5', 'result'];
    const [selectedValues, setValue] = useState([null,null,null,null,null]);
    const [currentQ, setCurrent] = useState(1);

    // const [results, setResult] = useState(['pop','rock']);
    const [results, setResult] = useState(null);

    const handleNext = (index, value) => {
        console.log(index, value);
        setCurrent(index=>{
            if (currentQ < index + 1) {
                return index + 1;
            }
        });
        setValue(values=>{
            values[index] = value;
            console.log(values);
            return values;
        })

        if (index + 1 >= questions.length) {
            //show results
            const cc = {};
            selectedValues.forEach((v,i)=>{
                console.log(v, i)
                if (!cc[v]) cc[v] = 0;
                cc[v] ++;
            })
            console.log(cc);
            let tot = 0;
            let win = '';
            for (let p in cc) {
                if (cc[p] > tot) {
                    tot =cc[p];
                    win = p
                }
            }
            // check for draw
            win = [win];
            for (let p in cc) {
                if (cc[p] === tot && p != win[0]) {
                    //draw
                    win.push(p);
                }
            }
            setResult(win.sort());
            console.log(tot, win, win.sort());
        }
         
    }
    const content = useSelector(s=>s.content);
    // useEffect(()=> {
    //     console.log(`#${scrollTargets[currentQ]}`);
    //     ref.current.querySelector(`#q${scrollTargets[currentQ]}`).scrollIntoView({behaior: 'smooth'});
    // },[currentQ])
    return (
        <div
            ref={ref} 
            className="question-panel"
        >
            <form action="">
                { questions.slice(0,currentQ).map((v, i)=> {
                    return (
                        <Question data={v} index={i} key={i} onDone={handleNext} id={`q${i+1}`}/>
                            
                    )

                })}
            </form>
            {results && 
                <div id="result">
                    <div className="inner">

                        <div className="summary">
                            <p>Your go-to playlist is...</p>
                            <div className="list-name">
                                <p {...setHtml(content[`name-${results.join('-')}`])} />
                                
                            </div>
                            <div className="list-desc">
                                <p {...setHtml(content[results.join('-')])}
                                />
                            </div>
                        </div>
                        <div className="embed">
                            {results.map((v,i)=>
                                <div className="playlist">

                                    <iframe style="border-radius:12px" src={`${playlists[v].playlist}`} width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>                    
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

const Main = () => {
    const loaded = useSelector(s=>s.dataLoaded);
    
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch( fetchData('https://interactive.guim.co.uk/docsdata/1E8dx7Rm9fRCOeNqen8yL6Gd0FDZi-1a4zzdhd8_cd5U.json') );
    },[]);




    const content = useSelector(s=>s.content);

    const store = useSelector(s=>s);    
    // return <Loading />;

    return (
        <SwitchTransition>
            <Transition
                key={loaded}
                timeout={1000}
                onEnter={n=>gsap.from(n,{alpha: 0})}
                onExit={n=>gsap.to(n,{alpha:0})}
                mountOnEnter
                unmountOnExit
                appear={true}
            >
                {!loaded && <Loading />}
                {loaded &&

                    
                    <MainBody>

                        
                        <HeaderWithLogo />                        

                        <section>
                            <Container>
                                <div className="intro-body">
                                <Standfirst content={content}></Standfirst>
                                    <div>
                                        <Attribution content={content}/>

                                    </div>
                                    <div className="">

                                        <Intro content={content}></Intro>

                                    </div>
                                </div>
                            </Container>                        

                        </section>
                        <section>

                            <QuestionPanel questions={content.questions}/>
                        </section>
                        
                         
                        <Footer content={content} related={store.sheets.related} shareUrl={store.sheets.global[0].shareUrl} />
                        

                    </MainBody>
                    
                }
            </Transition>            
        </SwitchTransition>
    )
}


const App = () => {
    return (
        <Provider store={store}>
            <Main/>
        </Provider>

    )
}

render( <App/>, document.getElementById('Glabs'));

