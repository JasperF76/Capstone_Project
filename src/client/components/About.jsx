import MeInATree from '../assets/Me_in_a_tree.jpg';
import MeWithASaw from '../assets/Me_with_a_saw.jpg';
import MeMovingLogs from '../assets/Me_moving_logs.jpg';

export default function About() {

    return (
        <div className='about_header'>
            <h1>About this website</h1>
            <div className="about_body">
                <div className="paragraph_1"><img src={MeInATree} alt="Me climbing" className='arborist_image' />
                    <p>
                        If you've ever talked to me for more than 5 minutes, there's a good chance that you may already know that I spent nearly 3 decades of my working life as an arborist.
                        Climbing trees, pruning trees, cutting down trees, chipping up trees and even (occasionally!) planting trees has been, and will continue to be, a huge part of my life.
                        Unfortunately, work as an arborist is not only very physically demanding, but also very dangerous. There are numerous ways to be injured doing my former job...
                        And I went and discovered one of them. A neck injury sidelined me in 2022, and ultimately lead to me being unable to return to the profession that I'd dedicated more than half of my life to.
                    </p>

                </div>

                <div className="paragraph_2">
                    <p>
                        Which brings me to the creation of this website. Unable to continue trimming trees, I was compelled to find a brand new career at the tender age of 48 that my body could actually handle.
                        And hopefully, fingers crossed, that new career is going to be as a software developer! After 3 months of very educational, very rewarding, and, at times, very <i>frustrating</i> instruction, I have managed to build my very first website.
                        When my FullStack Academy bootcamp instructor (hi Mark!) suggested that our final project should perhaps be something that we are passionate about, I knew right away that my capstone would have something to do with trees.
                    </p>
                    <img src={MeWithASaw} alt="Me with a saw" className='arborist_image' />
                </div>

                <div className='paragraph_3'>
                    <img src={MeMovingLogs} alt="Me on the log truck" className='arborist_image' />
                    <p>
                        And so I give you, "Trees of the World," a website dedicated to my love of trees, and that bridges my former profession to my new one.
                        This site introduces you to some of the more iconic trees around the world, from the world's oldest known tree, Methuselah, to the largest tree, General Sherman.
                        But don't forget about the ordinary, every day trees that you see in front of your house, or on your ride to work. Every tree is remarkable in it's own right, and they all speak to the brilliance of their Designer.
                        My hope is that after viewing the amazing tree facts on this website, you'll come away with a newfound respect and appreciation for your silent neighbors, and for all that they do for us.
                        And by creating and regularly updating this 'labor of love' project of mine, I can stay connected to the profession that I loved.
                    </p>

                </div>
                <br /><br />
                <p>
                    Thanks for reading, and please enjoy the site!
                </p>
                <br /><br />
                <div className='paragraph_4'>
                    <p>
                        <strong>Special Thanks:</strong>
                        <br /><br />
                        <b><i>Jehovah God</i></b>, first and foremost, without whom I'm convinced I would not have made it this far
                        <br /><br />
                        My loving wife and daughter, <i>Janine</i> and  <i>Jasmine</i>, for all their support, encouragement, and acceptance through the past couple of years of me navigating finding new employment
                        <br /><br />
                        <i>Marisa Brienza</i> and <i>Tami Glancy</i>, the amazing career counselors that steered me in the right direction
                        <br /><br />
                        <i>Louis Demicco</i>, <i>Thomas Hamilton</i>, and all the staff at my Dr/Physical Therapist
                        <br /><br />
                        <i>Mark</i> (and <i>Lincoln</i>) <i>Lawrence</i>, the persons who taught me how to code this site
                        <br /><br />
                        All my classmates at Fullstack Academy who had to put up with an old dog trying to learn a new trick
                        <br /><br />
                        All the "tree dogs" I've worked with over the past 28 years, especially the ones we've lost along the way.
                    </p>
                </div>
            </div>
        </div>
    )
}