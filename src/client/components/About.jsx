import MeInATree from '../assets/Me_in_a_tree.jpg';
import MeWithASaw from '../assets/Me_with_a_saw.jpg';
import MeCoding from '../assets/Me_coding.jpg';

export default function About() {

    return (
        <div className='about_header'>
            <h1>About this website</h1>
            <div className="about_body">
                <div className="paragraph_1">
                    <p>
                        If you've ever talked to me for more than 5 minutes, there's a good chance that you may already know that I spent nearly 3 decades of my working life as an arborist.
                        Climbing trees, pruning trees, cutting down trees, chipping up trees and even (occasionally!) planting trees has been, and will continue to be, a huge part of my life.
                        However, work as an arborist is very physically demanding, and there are numerous ways one can be injured doing my former job.
                        A back injury had me off of work for an entire year in 2020, followed by a neck injury that sidelined me for another 2 years in 2022, and those two injuries ultimately lead to me being unable to return to the profession that I'd dedicated more than half of my life to.
                    </p>
<img src={MeInATree} alt="Me climbing" className='arborist_image' />
                </div>

                <div className="paragraph_2">
                    <img src={MeWithASaw} alt="Me with a saw" className='arborist_image' />
                    <p>
                        Which brings me to the creation of this website. Unable to continue my career as an arborist, I was left with no choice but to jump into a brand new career at the tender age of 48.
                        And hopefully, fingers crossed, that new career is going to be as a software developer! After 3 months of intense training at Cleveland State University's Fullstack Academy that was equal parts rewarding and <i>frustrating</i>, I have managed to build this, my very first website.
                        When my bootcamp instructor (hi Mark!) suggested that our final project should perhaps be something that we are passionate about, I knew right away that my capstone would have something to do with trees.
                    </p>
                    
                </div>

                <div className='paragraph_3'>
                    
                    <p>
                        And so I give you, "Trees of the World," a website dedicated to my love of trees, and that bridges my former profession to my new one.
                        This site introduces you to some of the more iconic trees around the world, from the world's oldest known tree, Methuselah, to the world's largest tree by volume, General Sherman.
                        But don't forget about the ordinary, every day trees that you see in front of your house, or on your ride to work. Every tree is remarkable in it's own right, and their fascinating design speaks to the brilliance of their Designer.
                        My hope is that after viewing the amazing trees on this website, you'll come away with a newfound respect and appreciation for your silent neighbors, and for all that they do for us.
                        And by creating and regularly updating this 'labor of love' project of mine, I can stay connected to the profession that I loved.
                    </p>
<img src={MeCoding} alt="Me at my computer" className='arborist_image' />
                </div>
                <br /><br />
                <p>
                    Thanks for reading, and please enjoy the site!
                </p>
                <br /><br />
                <div className='paragraph_4'>
                    <p>
                        <strong>Special Thanks to:</strong>
                        <br /><br />
                        <b><i>Jehovah God</i></b>, first and foremost, without whom I'm convinced I would not have made it this far (in life, or in bootcamp!)
                        <br /><br />
                        My loving wife and daughter, <i>Janine</i> and <i>Jasmine</i>, for all their support, encouragement, and acceptance throughout the past 2 years of me navigating finding new employment (and for talking me out of quitting coding a few days after starting javascript)
                        <br /><br />
                        <i>Marisa Brienza</i> and <i>Tami Glancy</i>, the two <i>AMAZING</i> career counselors that steered me in the right direction, and who worked their butts off to get me approved to join a coding bootcamp
                        <br /><br />
                        <i>Louis Demicco</i>, <i>Thomas Hamilton</i>, and all the staff at my Dr/Physical Therapist
                        <br /><br />
                        <i>Mark</i> (and <i>Lincoln</i>) <i>Lawrence</i>, and the Fullstack mentors (shoutout to Caitlin and Javier!) the persons who taught me how to code this site
                        <br /><br />
                        My fellow classmates at Fullstack Academy for helping an old dog learn a few new tricks
                        <br /><br />
                        All the "tree dogs" I've worked with over the past 28 years, especially the ones we've lost along the way.
                    </p>
                </div>
            </div>
        </div>
    )
}