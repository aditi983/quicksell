import React from 'react'
import '../styling/icon.css'

function Iconwithonline({userId,Userdata}) {
    const numIcons = 10; 
  const randomImageIds = Array.from({ length: numIcons }, () => Math.floor(Math.random() * 10) + 1);

    
  return (
    <div className='maindivicon'>
    
        <div className='circularimg'>
        <img


          className="randomicon"
          src={`https://source.unsplash.com/1600x900/?portrait/${randomImageIds}`}
          alt=""
        />

        </div>
        {
            Userdata.map(it=>{
                
              if (it.id===userId){
                
                if(it.available===false)return(
                    
                    <div className='actively1' style={{backgroundColor:'grey'}}>
            

                    </div>

                )
            else{
                return( <div className='actively2'style={{backgroundColor:'green'}} >
            

                </div>);
            }
                
               

              }
              
            }
            
            )
        }
      



    </div>
  )
}

export default Iconwithonline