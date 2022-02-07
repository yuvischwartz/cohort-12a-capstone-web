import logo from "./logo.svg";
import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import "./App.css";
import { Collapse, Button } from 'antd';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

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


        <div className={'col-span-12 border p-5'}>
          <ul>
          <li><p className={'text-small float-right'}>Welcome, Username <button className={'text-blue-700 font-medium'}>Logout</button></p></li>
            <li><i className={'fab fa-adn text-black bg-red-400'}></i></li>
           
          <li><h1 className={'text-center text-2xl'}>App Title</h1></li>
          
          </ul>
        </div>

        <div className={'col-span-12 sm:col-span-3 border p-0 border'}>
          
          <ul>
            {categories && categories.map((category) => {
              return <li key={category.id}
                onClick={()=> setSelectedCategory(category.id)}
                className={selectedCategory == category.id ? 'text-left p-12 border-b text-center cursor-pointer text-blue-700 font-medium' :
                'text-left p-12 border-b text-center cursor-pointer'}>{category.name}</li>
            })}
          </ul>
          <p>selected is {selectedCategory}</p>
        </div>

        {/* <ul>
            {questions.map((que) => {
              return <li>{que.questionTxt}</li>
            })}
          <p>HELLOE YOU</p>
          </ul> */}

        <div className={'col-span-12 sm:col-span-9 p-10'}>
          {!selectedCategory && <h1 className={'text-center p-20'}>Select category to view the questions</h1>}
          
          
          {selectedCategory && <button onClick={() => setIsQuestionVisible(true)}
          className={'text-white pr-4 pl-4 pt-3 pb-3 bg-blue-500 rounded cursor-pointer'}>New Question</button>}

          {selectedCategory && isQuestionVisible &&
            <form>
              <h1>USERNAME, enter your question</h1>
              <textarea value={textArea} onChange={handleChange} placeholder={'Enter your question here'}
              className={'border mt-10 placeholder:italic bg-white w-5/12 rounded-md sm:text-sm'} />
            
              <button onClick={handleSubmit}>Submit</button> 
              <button onClick={handleCancel}>Cancel</button>
            </form>}
          
          <p>the text is: {textArea}</p>

          
          <br />
          <br />
          <br />
          <br />
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
    </>
    );
    }

    export default App;
