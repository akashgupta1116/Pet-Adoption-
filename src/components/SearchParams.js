import React,{useState,useEffect,useContext} from 'react';
import pet,{ANIMALS} from '@frontendmasters/pet';
import useDropdown from './useDropdown';
import Results from './Results';
import './brianHoltCourse.css';
import ThemeContext from './ThemeContext'


const SearchParams = ()=>{
    const [location,seLocation] = useState('Seattle,WA');
    // const [animal,setAnimal] = useState('dog');
    // const [breed,setBreed] = useState('');
    const [breeds,setBreeds] = useState([]);
    const [animal,AnimalDropdown] = useDropdown('Animal','dog',ANIMALS);
    const [breed,BreedDropdown,setBreed] = useDropdown('Breed','',breeds);
    const [pets,setPets] = useState([]);
    const [theme,setTheme] = useContext(ThemeContext)

    async function requestPets(){
        const {animals} = await pet.animals({
            location,
            breed,
            type:animal 
        })

        setPets(animals || []);        // if this promise return something then set animals if doesnot return anything set empty array
        console.log(animals)
    }

    useEffect(()=>{
       setBreeds([]);
       setBreed('');    // We are setting default value everytime animal gets changed and useEffect gets called
                                //Destructuring and giving breeds to apiBreeds
       pet.breeds(animal).then(({breeds:apiBreeds})=>{
                                                //destructuring
            const breedString = apiBreeds.map(({name})=>name);
            setBreeds(breedString)
       },console.error);
       
       //Effect dependencies => these are put when something inside it changes useEffect gets called
    },[animal,setBreeds,setBreed])            // if we dont put animal there then we change the animal its not going to re-render
    // Breeds is not here in dependency because we are not using it in useEffect
    return (
        <div className="search-params">

            <form onSubmit={(e)=>{
                e.preventDefault();
                requestPets();
            }}>
                <label htmlFor="location">
                    Location
                    <input id="location" placeholder="Location" value={location} onChange={e=>seLocation(e.target.value)}/>
                </label>

                {/* <label htmlFor="animal">
                    Location
                    <select id="animal" value={animal} onChange={e=>setAnimal(e.target.value)}>
                        <option>All</option>
                        {ANIMALS.map(animal=>(
                        <option key={animal} value={animal}>{animal}</option>))}
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select id="breed" value={breed} onChange={e=>setBreed(e.target.value)} disabled={breeds.length===0}>
                        <option>All</option>
                        {breeds.map(breedString=><option key={breedString} value={breedString}>{breedString}</option>)}
                    </select>
                </label> */}
                <AnimalDropdown/>
                <BreedDropdown/>
                <label htmlFor="theme">
                    Theme
                    <select id="theme" value={theme} onChange={e=>setTheme(e.target.value)}>
                        <option value="peru">peru</option>
                        <option value="darkblue">darkblue</option>
                        <option value="mediumorchid">medium orchid</option>
                        <option value="chartreuse">chartreuse</option>
                    </select>
                </label>
                <button style ={{backgroundColor:theme}}>Submit</button>      
            </form>
            <Results pets={pets} />

        </div>
    )
}


export default SearchParams;


// Here inside the style tag of button first curly brackets represents Jsx and the second brackets represents objects