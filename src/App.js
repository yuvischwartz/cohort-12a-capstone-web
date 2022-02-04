import logo from "./logo.svg";
import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import "./App.css";
// import { Category } from "../../api/lib/models";

function App() {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const fetchCategories = async () => {
    let res = await fetch('http://localhost:3000/api/v1/categories')
    let json = await res.json()
    console.log(json);
    if ( Array.isArray(json.success) ) {  
      setCategories(json.success);
    }
  };

  useEffect(() => {
      fetchCategories()
  }, [])
  
  return (
    <>
      <div className={'grid grid-cols-12'}>

        <div className={'col-span-12 border p-8 bg-gray-200'}>
          <ul>
          <li><p className={'text-small float-right'}>Welcome, Username <button className={'text-blue-700 font-medium'}>Logout</button></p></li>
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

        </div>

        <div className={'col-span-12 sm:col-span-9 p-10'}>
           {!selectedCategory && <h1 className={'text-center p-20'}>Select category to view the questions</h1>}
           {selectedCategory && <button className={'text-white pr-4 pl-4 pt-3 pb-3 bg-blue-500 rounded cursor-pointer'}>New Question</button>}
        </div>

      </div>
  </>
  );
    }

    export default App;
