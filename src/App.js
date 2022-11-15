import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [utilisateurs, setUtilisateurs] = useState([])
  const [articles, setArticles] = useState([])
  const [userActif, setUserActif] = useState(0)
  useEffect(()=> {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response)=>{return response.json()})
    .then((data)=>setUtilisateurs(data));
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response)=>{return response.json()})
    .then((data)=>setArticles(data));
  }, [])
  function handleClick(id) {
    setUserActif(id)
  }
  return (
    <div style={{padding:"20px"}}>
      <h1>Liste de utilisateurs</h1>
      {
        utilisateurs.map((utilisateur, index) => {
          return (
            <p key={index}>
              {utilisateur.name} 
              <button onClick={()=>handleClick(utilisateur.id)}>détails des articles</button>
              <div>
                {
                  userActif===utilisateur.id
                  ?<ul> {
                    articles.filter((item)=>item.userId===parseInt(userActif))
                    .map((article)=> {
                      return <li>{article.id} {article.title}</li>
                    })
                    }
                    </ul>
                  :null
                }
              </div>
            </p>
          )
        })
      }
    </div>
  );
}

export default App;
