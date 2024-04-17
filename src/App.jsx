import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react';

function App() {

  const [inpVal,setInpVal] = useState({
    username : "", 
    password : ""
  })

  const [datas,setDatas] = useState([]); 


  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get('http://localhost:3005/users'); 
      setDatas(response.data);
    }
    getProducts();
  },[])

  const handleChange = (e) => {
    setInpVal({...inpVal , [e.target.name] : e.target.value}); 
  }

  const addOrUpdateUser = async () => {
    if (inpVal.username.trim() !== "" && inpVal.password.trim() !== "") {
      try {
        if (inpVal.id) {
          await axios.put(`http://localhost:3005/users/${inpVal.id}`, inpVal);
          setDatas(datas.map(item => (item.id === inpVal.id ? inpVal : item)));
        } else {
          const response = await axios.post('http://localhost:3005/users', inpVal);
          setDatas([...datas, response.data]);
        }
        setInpVal({ username: "", password: "" });
      } catch (error) {
        console.error('Error adding/updating user:', error);
      }
    }
  };

  const editUser = (user) => {
    setInpVal(user);
  };

const deleteData = async(id) => {
  try {
    await axios.delete(`http://localhost:3005/users/${id}`);
    setDatas(datas.filter(item => item.id !== id));
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}



console.log(datas); 
  return (
    <div className='cont'>
        <h1>JSON SERVER | REACT.JS</h1>

      <input name='username' value={inpVal.username} onChange={handleChange} type="text" placeholder='Enter User Name...' />
      <input name='password' value={inpVal.password} onChange={handleChange} type="password" placeholder='Enter Password...' />
      <button onClick={addOrUpdateUser}>Submit to API</button>

<div className='box_cont'>
  {
    datas.map(item => (
      <div key={item.id} className='box'>
        <p>{item.username}</p>
        <p>{item.password}</p>
        <button className='edit' onClick={() => editUser(item)}>Edit</button>

        <button onClick={()=>deleteData(item.id)}>Delete</button>
      </div>
    ))
  }
</div>

<pre>
  {JSON.stringify(datas , null,2)}
</pre>


    </div>
  )
}

export default App