import React from 'react';
import {navigate} from '@reach/router';
import Modal from './Modal'
import pet from '@frontendmasters/pet';
import Carousel from './Carousel'
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext'

class Details extends React.Component{

    state={ loading:true, showModal:false }
    // constructor(props){
    //     super(props);
    //     this.state={
    //         name:'',
    //         animal:'',
    //         location:'',
    //         description:'',
    //         breed:'',
    //         loading:true
    //     }
    // }
    componentDidMount(){
        // throw new Error('lol'); 
        pet.animal(this.props.id)

        .then(({animal})=>{

            this.setState({
                url:animal.url,
                name:animal.name,
                animal:animal.type,
                location:`${animal.contact.address.city},${animal.contact.address.state}`,
                description:animal.description,
                media:animal.photos,
                breed:animal.breeds.primary,
                loading:false

            },console.error)
        })

    }

    toggleMdal = ()=> this.setState({ showModal: !this.state.showModal})

    adopt = () => navigate( this.state.url )

    render(){
        if(this.state.loading){
            return <h1>Loading</h1>
        }
        const {name,animal,location,description,breed , media, showModal } = this.state
        return (
            <div className = "details">
                <Carousel media = {media}/>
                <div>
                 <h1>{name}</h1>
                 <h2>{`${animal} - ${breed} - ${location}`}</h2>
                 <ThemeContext.Consumer>
                     {(themeHook)=>(
                         <button onClick={ this.toggleMdal } style={{backgroundColor:themeHook[0]}}>Adopt{name}</button>    //we do themeHook[0] because themeHook also contain setTheme but want onlu theme. We can do this by destructuing as ([theme])

                     )}
                 </ThemeContext.Consumer>
                 <p>{description}</p>
                 { showModal ? 
                    <Modal>
                        <div>
                            <h1 > Would you like to adopt {name}</h1>
                            <button onClick={ this.adopt }>Yes</button>
                            <button onClick={this.toggleMdal}>No , I am a monster</button>

                        </div>
                    </Modal>
                 : null}
                </div>

            </div>
    
            //Trick to show Props Data => here pre tag is used to for preformatting means it show exactly how you write the code
            // <pre>
            //     <code>{JSON.stringify(props,null,4)}</code>     // null represents that it will remove all the null elements 
            // </pre>                                              // 4 shows no.of spaces 

            )
    }
}

export default function DetailsErrorBoundary(props) {
    return (
      <ErrorBoundary>
        <Details {...props} />
      </ErrorBoundary>
    );
  }