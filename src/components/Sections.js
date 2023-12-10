import React from "react";
import Cards from "./Cards";
import Iconwithonline from "./ui_functions/Iconwithonline";

import { PiCellSignalNoneFill } from "react-icons/pi"; //no priority
import { BsFillExclamationSquareFill } from "react-icons/bs"; // urgent
import { PiCellSignalFullFill } from "react-icons/pi";
import { PiCellSignalMediumFill } from "react-icons/pi";
import { PiCellSignalLowFill } from "react-icons/pi";
import { BiAdjust } from "react-icons/bi"; //inprogress yellow
import { BsFillXCircleFill } from "react-icons/bs"; //cancelled grey
import { FcOk } from "react-icons/fc"; // done blue
import { PiCircle } from "react-icons/pi"; //todo grey
import { PiCircleDashed } from "react-icons/pi"; //backlog grey

const priority_icon = {
  "No Priority": PiCellSignalNoneFill,
  "Urgent": BsFillExclamationSquareFill,
  "High": PiCellSignalFullFill,
  "Medium": PiCellSignalMediumFill,
  "Low": PiCellSignalLowFill,
};
const priority_icon_color = {
  "No Priority": "grey",
  "Urgent": "orange",
  "High": "grey",
  "Medium": "grey",
  "Low": "grey",
};

const progress_icon = {
  Backlog: PiCircleDashed,
  Todo: PiCircle,
  "In progress": BiAdjust,
  Done: FcOk,
  Canceled: BsFillXCircleFill,
};

const progress_icon_color = {
  Backlog: "grey",
  Todo: "grey",
  "In progress": "orange",
  Done: "blue",
  Canceled: "grey",
};

const Sections = ({ index, ticketData, passingData, groupBy }) => {
  // group by is for like the user profile link is not mentioned so depending upon group by we can create custom random profiles pic
  //and  also icon for inprogress and inpriority

  // for dp we can use shuttershock for random dp as custom dp is not mentioned in api dp will change on refresh

  const priority_seq = ["Urgent", "High", "Medium", "Low", "No Priority"];

  // const status_seq=[
  //   "Backlog",
  //   "Todo",
  //   "In progress",
  //   "Done","Canceled"]

  //decreasing order at max 6 for icon purpose

  return (
    <div style={{ backgroundColor: "", maxWidth: "16em" }}>
      {groupBy === "status" && (
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* {console.log(passingData[index][0].userId)} */}

            <div
              style={{
                color: `${progress_icon_color[index]}`,
                marginRight: ".5em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* // {console.log(typeof progress_icon[status])} */}
              {React.createElement(progress_icon[index])}
            </div>

            <div style={{ marginRight: "1.4em" }}>{index}</div>

            <div className="header">
              {passingData[index].length ? passingData[index].length : 0}
            </div>

            <div
              style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
            >
              <div
                className="header"
                style={{
                  marginLeft: "4em",
                  fontSize: "1.2em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "1em",
                }}
              >
                +
              </div>

              <div className="header">...</div>
            </div>
          </div>

          <div>
            {
              //  console.log(passingData[index])
              passingData[index].length &&
                passingData[index].map((value) => {
                  return (
                    <Cards
                      id={value.id}
                      title={value.title}
                      groupBy={groupBy}
                      userId={value.userId}
                      priority={value.priority}
                      ticketData={ticketData}
                      status={value.status}
                      requirement={value.tag}
                    />
                  );
                })
            }
            {passingData[index].length === 0 && (
              <div
                style={{
                  minWidth: "2.1em",
                  minHeight: "3em",
                  height: "3em",
                  backgroundColor: "red",
                }}
              >
                hello
              </div>
            )}
          </div>
        </div>
      )}

      {groupBy === "priority" && (
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
{console.log(priority_icon_color[priority_seq[index]])}
          <div
              style={{
                 color: `${priority_icon_color[priority_seq[index]]}`,
                marginRight: ".5em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* // {console.log(typeof progress_icon[status])} */}
              
              {React.createElement(priority_icon[priority_seq[Number(index)]])}
            </div>
            {/* {console.log(passingData[index][0].userId)} */}

            {/* icon */}
            {/* <Iconwithonline index={index} userId={passingData[4-index][0].userId} Userdata={ticketData.users}/>  */}

            <div style={{ marginRight: "1.4em" }}>
              {passingData[4 - index] !== undefined && priority_seq[Number(index)]}
            </div>
      

            <div className="header">
              {" "}
              {passingData[4 - index] !== undefined &&
                passingData[4 - index].length}{" "}
            </div>

            <div
              style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
            >
              <div
                className="header"
                style={{
                  fontSize: "1.2em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "1em",
                }}
              >
                +
              </div>

              <div className="header">...</div>
            </div>
          </div>

          <div>
            {
              //  console.log(passingData[index])
              passingData[4 - index] !== undefined &&
                passingData[4 - index].map((value) => {
                  
                  return (
                    <Cards
                      id={value.id}
                      title={value.title}
                      groupBy={groupBy}
                      userId={value.userId}
                      ticketData={ticketData}
                      status={value.status}
                      priority={value.priority}
                      requirement={value.tag}
                    />
                  );
                })
            }
          </div>
        </div>
      )}

      {groupBy === "user" && (
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* {console.log(passingData[index][0].userId)} */}

            {/* icon */}
          {
         
                <Iconwithonline
                userId={index}
                Userdata={ticketData.users}
              />

              
            
          }

           

            <div style={{ marginRight: "1.4em" }}>   {
            ticketData.users.map(key=>{
              if(key.id===index){
               return (key.name)
            

              }
            })
          }</div>

            <div className="header">{passingData[index].length}</div>

            <div
              style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
            >
              <div
                className="header"
                style={{
                  fontSize: "1.2em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "1em",
                }}
              >
                +
              </div>

              <div className="header">...</div>
            </div>
          </div>

          <div>
            {
              //  console.log(passingData[index])
              passingData[index].map((value) => {
                return (
                  <Cards
                    id={value.id}
                    title={value.title}
                    groupBy={groupBy}
                    userId={passingData[index][0].userId}
                    ticketData={ticketData}
                    status={value.status}
                    priority={value.priority}
                    requirement={value.tag}
                  />
                );
              })
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Sections;
