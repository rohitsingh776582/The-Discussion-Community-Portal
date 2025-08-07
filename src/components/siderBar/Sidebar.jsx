
import React from "react";
import './SidebarOptions.css';

function SidebarOptions() {
    return (
        <div className="sidebarOptions">
            <div className="sidebarOption">
                <img
                    src="https://www.shutterstock.com/image-photo/old-geographical-globe-map-book-260nw-2311165765.jpg"
                    alt="History"
                />
                <p>History</p>
            </div>

            <div className="sidebarOption">
                <img
                    src="https://www.shutterstock.com/image-photo/two-happy-busy-middle-aged-600nw-2479065515.jpg"
                    alt="Business"
                />

                <p>Business</p>
            </div>
            <div className="sidebarOption">
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/022/756/603/small/conceptual-image-of-a-human-head-with-colorful-brain-and-autumn-leaves-mental-health-concept-ai-generated-artwork-photo.jpg"
                    alt="Psychology"
                />
                <p>Psychology</p>
            </div>

            <div className="sidebarOption">
                <img
                    src="https://t4.ftcdn.net/jpg/02/67/33/49/360_F_267334945_Wh5hvfnej5Th6U0VxiST66srSXoV0p6N.jpg"
                    alt="Cooking"
                />
                <p>Cooking</p>
            </div>

            <div className="sidebarOption">
                <img
                    src="https://img.freepik.com/premium-vector/colorful-musical-note-art-with-vibrant-splashes-musical-note-black-surrounded_53876-651215.jpg?semt=ais_hybrid&w=740"
                    alt="Music"
                />
                <p>Music</p>
            </div>

            <div className="sidebarOption">
                <img
                    src="https://media.istockphoto.com/id/1374389013/photo/genetic-research-and-biotech-science-concept.jpg?s=612x612&w=0&k=20&c=y558gbazr6JptdDy-QOn23V5ETU0RR9W__lOnc5AJUM="
                    alt="Science"
                />
                <p>Science</p>
            </div>

            <div className="sidebarOption">
                <img
                    src="https://media.istockphoto.com/id/478360036/photo/global-healthcare.jpg?s=612x612&w=0&k=20&c=N5BwPB3sxwynCv6299ClD6C4HrQ5kxkb7I3r0HEBE7k="
                    alt="Health"
                />
                <p>Health</p>
            </div>

            <div className="sidebarOption">
                <img
                    src="https://happenings.lpu.in/wp-content/uploads/2018/01/636055955513037869162211565_movie.jpg"
                    alt="Movies"
                />
                <p>Movies</p>
            </div>

            <div className="sidebarOption">
                <img
                    src="https://www.wscubetech.com/blog/wp-content/uploads/2024/04/generative-ai.webp"
                    alt="Technology"
                />
                <p>Technology</p>
            </div>

            <div className="sidebarOption">
                <img
                    src="https://thumbs.dreamstime.com/b/kids-education-child-boy-study-school-thinking-bubble-dreaming-over-black-chalkboard-75214276.jpg"
                    alt="Education"
                />
                <p>Education</p>
            </div>
            <div className="sidebarOption">
                {/* <Add /> */}
                <p className="text">Discover Spaces</p>
            </div>
        </div>


    );
}

export default SidebarOptions;
