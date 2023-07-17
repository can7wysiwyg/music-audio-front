import "./styles/about.css"
import Eureka from "../images/eureka.jpg"

function About() {
    return(<>


<div class="container" style={{marginTop: "3rem"}}>
    <div class="jumbotron">
      <h3 class="display-4">Why You Should Advertise with Us...</h3>
      <div class="text-center">
      <img class="about-image img-fluid" src={Eureka} alt="AboutImage" />
      </div>

      <p class="lead">
      <strong>Captivate with Engaging Audio Excerpts:</strong> Advertising on our website provides authors with a unique opportunity to captivate their target audience through the power of audio. By featuring audio excerpts from their books, authors can bring their stories to life and immerse readers in the world they've created. The spoken word has a captivating effect, enabling authors to connect with listeners on a deeper level and leave a lasting impression. 
      This engaging approach to advertising ensures that authors can effectively communicate the essence of their book, making it more memorable for potential readers.



      </p>


        <p>
            
       <strong> Reach the Right Audience:</strong> Our website is tailored to attract a specific audience that appreciates the 
        written word and enjoys the experience of hearing stories come alive. 
        By advertising with us, authors can reach a targeted demographic of
         readers who are actively seeking new books to explore. The audio excerpts act as a teaser,
          enticing the right audience to delve further into the book's content. This focused approach ensures that authors can effectively showcase their work to individuals who are more likely to resonate with their writing style and genre, 
        leading to increased visibility and potential book sales.   
            
       </p>


    <p class="lead">
    <strong>Enhance Book Discoverability: </strong> In a crowded digital landscape, standing out as
     an author can be a challenge.
     By advertising on our website with audio excerpts,
      authors gain a competitive edge in terms of book discoverability. 
      The audio format offers a unique and interactive way for readers to sample a book's 
      content and experience the author's storytelling prowess firsthand. 
      This not only helps to differentiate the book from others but also generates curiosity
       and interest among potential readers. By providing an immersive and memorable experience, 
       authors can significantly enhance their book's discoverability, 
    leading to increased recognition and a broader readership.


    </p>




    </div>

    </div>

    
    </>)
}

export default About