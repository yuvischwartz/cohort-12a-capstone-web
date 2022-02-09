import logo from "./logo.svg";
import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import "./App.css";
import { Collapse, Button } from 'antd';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.`;

function App() {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const [textArea, setTextArea] = useState('');
  const [questions, setQuestions] = useState([]);


  const fetchCategories = async () => {
    let res = await fetch('http://localhost:3000/api/v1/categories')
    let json = await res.json()
    console.log(json);
    if (Array.isArray(json.success)) {
      setCategories(json.success);
    }
  };

  // const fetchQuestions = async () => {
  //   let res = await 
  // };
  // http://localhost:3000/api/v1/categories/:categorydId/questions

  const creatAquestion = async () => {
    let res = await fetch('http://localhost:3000/api/v1/categories/${selectedCategory}/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        questionTxt: textArea,
      })
    })
    .then(response => response.json())
    .then(data => {
    console.log(data)
    })
    .catch(eror => {
    console.log(eror);
    })
  }

  const fetchQuestions = async () => {
    let res = await fetch('http://localhost:3000/api/v1/c/categories/${selectedCategory}/questions')
    let json = await res.json()
    console.log(json);
    if (Array.isArray(json.success)) {
      setQuestions(json.success);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchQuestions();
  }, [])
  
  const onChange = async () => {
  };

  const showQuestion = () => {
    setIsQuestionVisible(true);
  };

  const handleSubmit = () => {
    creatAquestion();
    console.log('handlesubmit');
    setIsQuestionVisible(false);
  };

  const handleCancel = () => {
    setIsQuestionVisible(false); 
  };

  const handleChange = (event) => {
    setTextArea(event.target.value)
  };

  return (
    <>
      <div className={'grid grid-cols-12'}>

        {/* Menu #1 */}
        <div className={'col-span-12 bg-black p-1 text-sm '}>
          <ul className={'menu'}>
            <li className={'submenu text-white flex-auto p-3 pl-20 cursor-pointer'}>The 2021 State of Secure Identity report is here <i className={'fa-solid fa-angles-right bg-white'}></i>
            <button className={'submenu text-white hover:border pl-3 cursor-pointer'}>Download now</button></li>
            <li className={'submenu text-white p-3 cursor-pointer'}>Welcome, Username</li>
            <li className={'submenu text-white p-3 cursor-pointer'}><i className={'fas fa-globe text-white flex-end pr-1'}></i>English</li>
          </ul>
        </div>

        {/* Menu #2 */}
        <div className={'col-span-12 border p-2'}>
          <ul className={'menu'}>
            <li className={'navbar-item flex-auto cursor-pointer'}><button><i className={'fab fa-500px fa-lg pl-20'}></i></button> AskYourQuestion</li>
            <li className={'navbar-item cursor-pointer p-5'}><a href='default.html'>About</a></li>
            <li className={'navbar-item cursor-pointer p-5'}><a href='default.html'>Contact Us</a></li>
            <li className={'navbar-item cursor-pointer p-5'}><a href='default.html'>Security</a></li>
            <li className={'navbar-item cursor-pointer p-5'}><button className={'bg-orange pl-3 pr-3 text-white rounded buttonQ'}>Let's Ask Something</button></li>
            <li className={'navbar-item button cursor-pointer p-10'}><a href='default.html'>LOG IN</a></li>
            <li className={'navbar-item button cursor-pointer p-10'}><a href='default.html'>SIGN UP</a></li>   
          </ul>
        </div>
        
        {/* Categories list */}
        <div className={'col-span-12 sm:col-span-2 p-0 border '}>
          <ul>
            {categories && categories.map((category) => {return <li key={category.id} onClick={()=> setSelectedCategory(category.id)}
              className={selectedCategory == category.id ? 'selectedcategory text-left p-11 border-b text-center cursor-pointer rounded p-10 m-1' :
              'category text-left p-11 m-1 border-b text-center cursor-pointer  text-white rounded bg-blue1'}>{category.name}</li>
            })}
          </ul>
        </div>

        {/* Here I'm trying to show the questions */}
        {/* <ul>
            {questions.map((que) => {
              return <li>{que.questionTxt}</li>
            })}
          <p>HELLOE YOU</p>
          </ul> */}

        {/* The actual page */}
        <div className={'col-span-12 sm:col-span-9 p-10'}>
          {!selectedCategory && <h1 className={'text-center p-20'}>Select a category to view the <h1 className={'inline border-color border-solid border-2 border-black rounded pr-2 pl-2 pb-2 pt-0 cursor-pointer hover:text-blue-600'}>questions</h1></h1>}
          {/* {!selectedCategory && <button className={'button rounded text-white bg-blue1'}>Get Started</button>} */}
          
          {selectedCategory && <h1 className={'smtitle'}>Welcome To Category Number {selectedCategory}</h1>}
          {selectedCategory && <button onClick={() => setIsQuestionVisible(true)}
          className={'text-white pr-4 pl-4 pt-3 pb-3 bg-orange rounded cursor-pointer text-center '}>New Question</button>}
          
          {selectedCategory && isQuestionVisible &&
            <form>
              <br />
              <h1 className={'ptext'}>USERNAME, enter your question</h1>
              <textarea value={textArea} onChange={handleChange} placeholder={'Enter your question here'}
              className={'border mt-10 placeholder:italic bg-white w-4/12 rounded-md sm:text-sm'} />
            <br />
            <br />
              <button className={'button bg-blue1 rounded m-1 p-5 cursor-pointer hover:bg-blue-600 text-white'}onClick={handleSubmit}>Submit</button> 
              <button className={'button bg-blue1 rounded m-1 p-5 cursor-pointer hover:bg-blue-600 text-white'} onClick={handleCancel}>Cancel</button>
            </form>}
            <br />
          {selectedCategory && isQuestionVisible && <p className={'ptext'}>the text is: {textArea}</p>}
          {selectedCategory && <h1 className={'smtitle'}>Questions</h1>}
          {selectedCategory && <Collapse defaultActiveKey={['1']} onChange={onChange}>
            <Panel header="This is panel header 1" key="1">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 2" key="2">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 3" key="3">
              <p>{text}</p>
            </Panel>
          </Collapse>
        }
        </div>

      </div>
  </>);    
}

    export default App;
