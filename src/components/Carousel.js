import React from 'react';

class Carousel extends React.Component{
    state={
        photos:[],
        active:0
    };

    static getDerivedStateFromProps({media}){
        console.log(media);
        
        let photos = ['http://placecorgi.com/600/600'];
        
        if(media.length){
            photos = media.map(({large})=>large)
        }

        return {photos}
    }

    handleIndexClick=(event)=>{
        this.setState({
            active:+event.target.dataset.index           // here dataset is not a react Api its a DOM Api .So dataset.index refers to whats in data-index
                                                        //Any that come from DOM is string so we need to convert it into Number
                                                        //So we use + this makes it unary operator , we can also use parseInt                                                        
        })
    }

    render(){
        const {photos,active} = this.state
        return(
            <div className="carousel">
                <img src={photos[active]} alt ="animal"/>
                <div className="carousel-smaller">
                    {photos.map((photo,index)=>(            // We can also do this.props.media.map if we don't use getDerivedStateFromProps
                        <img key={photo} onClick={this.handleIndexClick} data-index={index} src={photo} className={index===active ? 'active':''} alt = 'animal-thumbnail'/>
                    ))}
                </div>
            </div>
        )
    }
}

export default Carousel