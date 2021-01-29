import React, { useState } from "react";
import axios from "axios";
import EditMenu from './EditMenu';
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);

  };
  const saveEdit = e => {
    e.preventDefault();
    //axios request to edit the api
    axiosWithAuth().post('/colors',colorToEdit)
    .then((res)=>{
      console.log(colorToEdit)
      updateColors(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  };

  const deleteColor = color => {
    //axios requst to edit the api,http://localhost:5000/api/colors/123 , last number is the color id, color.id
    axiosWithAuth().delete(`/colors/${color.id}`)
      .then((res)=>{
        // updateColors(res.data)
        console.log("from the delete call",res)
        console.log(colors)
          axiosWithAuth().get("/colors")
            .then((res)=>{
              updateColors(res.data)
            })
            .catch((err)=>{
              console.log(err)
            })
      })
      .catch((err)=>{
        console.log(err)
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.