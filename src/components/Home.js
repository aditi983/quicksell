import { React, useState, useEffect,useRef } from "react";
import Sections from "./Sections";
import { fetchData } from "../api/dataFetcher";
import { groupByFunc } from "./ui_functions/group";
import { sortTasks } from "./ui_functions/sorting";
import "./styling/Home.css";
import { BiSlider } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";

const Home = () => {
 
  // eslint-disable-next-line no-unused-vars
  const status_seq=[
    "Backlog",
    "Todo",
    "In progress",
    "Done","Canceled"]
  const [showController, setShowController] = useState(false);
  const controllerRef = useRef(null); 
  const[orderBy,setOrderBy]=useState('priority');
  const[groupBy,setGroupBy]=useState('status');
  const[ticketData,setTicketData]=useState(null);
  const[passingData,setPassingData]=useState(null);

  useEffect(()=>{
    if(sessionStorage.getItem("groupby")){
      setGroupBy(sessionStorage.getItem("groupby"));
    }

    if(sessionStorage.getItem("orderby")){
      setOrderBy(sessionStorage.getItem("orderby"));
    }

  },[])

  useEffect(()=>{

    const fetchTakAndSetTask = async () => {
      const fetchedData = await fetchData();
      if (fetchedData) {
        
        setTicketData(fetchedData);  
      }
    };
    fetchTakAndSetTask();

  },[])

  useEffect(() => {
    
    if(ticketData!==null){
         const a=groupByFunc(ticketData,groupBy);
        //  console.log(a);
        const d=sortTasks(a,groupBy,orderBy);
        if(groupBy==='status'){
for(let i=0;i<status_seq.length;i++){
  let check=false;
  // eslint-disable-next-line array-callback-return
  Object.keys(d).map(index=>{
    // eslint-disable-next-line eqeqeq
    if(index==status_seq[i])check=true;
    

  })
  // eslint-disable-next-line eqeqeq
  if(check==false){
    // console.log(check)
    d[status_seq[i]]={};
    
    
  }
}

        }
        sessionStorage.setItem("groupby", groupBy);
        sessionStorage.setItem("orderby", orderBy);
      
        setPassingData(d); 
    } 
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketData, groupBy, orderBy]);

  

    // Attach a click event listener to the document
    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (
          showController &&
          controllerRef.current &&
          !controllerRef.current.contains(event.target) &&
          !event.target.classList.contains("event_listen")
        ) {
          // If the clicked element is outside the controller and subDisplay, close the dropdown
          setShowController(false);
        }
      };
    
      document.addEventListener("click", handleOutsideClick);
    
      // Remove the event listener when the component unmounts
      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }, [showController]);
    // In this updated code, the handleOutsideClick function now also checks if the clicked element does not have the class "subDisplay" to ensure that the dropdown is closed only if the click occurred outside both the controller and the subDisplay.
    
    // Remember to adjust the "subDisplay" class name accordingly to match your actual class name if it's different in your project.
    
    
    
    
    
    

  return (
    <div className="home">
      <div className="top_header">
        <div
          className="controller" tabIndex={2}
          onClick={() => {
            setShowController(!showController);
          }}
          ref={controllerRef}
        >
          <div className="icons">
            <BiSlider />
          </div>
          <div className="head">Display</div>
          <div className="icons">
            <AiOutlineDown />
          </div>
        </div>
      </div>
      {showController && (
        <div className="subDisplay event_listen">
          <div className="subdispcontent event_listen">
            <div className="select_id event_listen">
              <p className="event_listen">Grouping</p>

              <div>
                <select className="event_listen" name="grouping" id="grouping" value={groupBy} onChange={(e)=>{setPassingData(null);setGroupBy(e.target.value)}}>
                  <option className="event_listen" value="status">Status</option>
                  <option className="event_listen" value="priority">Priority</option>
                  <option className="event_listen" value="user">User</option>
                 
                </select>
              </div>
            </div>
            <div className="select_id event_listen">
              <p className="event_listen">Ordering</p>
              <div>
                <select name="ordering" className="event_listen" id="ordering" value={orderBy} onChange={(e)=>{setPassingData(null);setOrderBy(e.target.value)}}>
                  <option className="event_listen" value="priority">Priority</option>
                  <option className="event_listen" value="title">Title</option>
                  
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="ticket_viewer" >
        {
          passingData && 
          Object.keys(passingData).map(
            index=>
            <Sections key={index} index={index} ticketData={ticketData} passingData={passingData} groupBy={groupBy}  />
            


          )
        }
      
      </div>
    </div>
  );
};

export default Home;
