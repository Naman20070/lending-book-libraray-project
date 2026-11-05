import { useState, useEffect, use } from "react";

function Library({API_URL , refresh , onAction}){
    const [selectedgenre,setGenre] = useState([""]);
    const [selectedtitle,setTitle] = useState([""]);
    const[selectedauthor,setAuthor] = useState([""]);
    const [selectedcopies,setCopies] = useState(0);
    const [selectedbooks,setBooks] = useState([]);




    function fetchbooks(){
        let url = `${API_URL}/books`;

        if (selectedgenre !== "" && selectedtitle !== "") {
            url = `${API_URL}/books?genre=${selectedgenre}&title=${selectedtitle}`;
        } else if (selectedtitle !== "") {
            url = `${API_URL}/books?title=${selectedtitle}`; 
        } else if (selectedgenre !== "") {
            url = `${API_URL}/books?genre=${selectedgenre}`; 
        }


        fetch(url)
            .then((res) => res.json())
            .then((data) => {setBooks(data);

            });
    }
} 