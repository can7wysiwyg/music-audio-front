import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

function Testo() {
    const[auid, setAuid] = useState([])
 useEffect(() => {
    const getAudios = async() => {
        const res = await axios("/audio/show_all")
        setAuid(res.data.results);
    } 

    getAudios()

 }, [])

 
    return(<>
{
    auid?.map((v1, index) => {
        return <div key={index}>
            <Reso v1={v1} />

        </div>

    })
}
    
    </>)
}


const Reso = ({v1}) => {
console.log(v1);

function Yo() {

    let audioPath = v1.audioBook.audioLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes
  let imagePath = v1.audioImage.imageLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes

  // Check if the audioLink starts with "uploads/" (new format)
  if (audioPath.startsWith("uploads/")) {
    let audioUrl = `http://localhost:5000/${audioPath}`;
    let imageUrl = `http://localhost:5000/${imagePath}`;
    return (
      <>
        <audio controls>
          <source src={audioUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <img src={imageUrl} alt="yo" />
      </>
    );
  } else {
    let audioUrl = `http://localhost:5000${audioPath}`;
    let imageUrl = `http://localhost:5000${imagePath}`;
    return (
      <>
        <audio controls>
          <source src={audioUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <img src={imageUrl} alt="yo" />
      </>
    );
  }

   
}



    return(<>

    {Yo()}
    
    

    </>)
}

export default Testo