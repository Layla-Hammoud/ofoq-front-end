import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./profile.module.css";
import Loader from "../../components/Loader/Loader";
import useApi from "../../hooks/useApi";
import { Avatar } from "@mui/material";
import facebook from "../../assets/facebook.svg";
import Card from "../../components/Card/Card";
import insta from "../../assets/insta.svg";
import Slider from "react-slick";
import { ArrowCarousel } from "../../components/ArrowCarousel/ArrowCarousel";
const Profile = () => {
  const [events, setEvents] = useState(null);
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const { loading, error, apiCall } = useApi();
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await apiCall({
        url: "user/get-profile",
        method: "post",
        data: { id: profileId },
      });
      setProfile(response.data[0]);
    };
    const fetchEvent = async () => {
      const response = await apiCall({
        url: "event/getByTeacher",
        method: "post",
        data: { id: profileId },
      });
      setEvents(response.data);
    };
    fetchEvent();
    fetchProfile();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <ArrowCarousel />,
    prevArrow: <ArrowCarousel />,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          nextArrow: null,
          prevArrow: null,
        },
      },
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          nextArrow: <ArrowCarousel />,
          prevArrow: <ArrowCarousel />,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          nextArrow: <ArrowCarousel />,
          prevArrow: <ArrowCarousel />,
        },
      },
    ],
  };

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  return loading ? (
    <p>
      <Loader heigth={"50vw"} />
    </p>
  ) : (
    profile && (
      <>
        <section className={style.profileContainer}>
          {profile.image ? (
            <Avatar
              src={profile.image}
              alt="profile"
              className={style.profileImageIcon}
            ></Avatar>
          ) : (
            <Avatar
              className={style.profileImageIcon}
              {...stringAvatar(
                `${profile.profileId.firstName} ${profile.profileId.lastName}`
              )}
            />
          )}
          <section className={style.infoWrapper}>
            <h1 className={style.profileName}>
              {profile.profileId.firstName && profile.profileId.lastName && (
                <>
                  {profile.profileId.firstName} {profile.profileId.lastName}
                </>
              )}
            </h1>
            <p>{profile.profileId.bio}</p>
            {profile.profileId.city && <p>City: {profile.profileId.city}</p>}
            <p>Certificate: {profile.profileId.certifications}</p>
            {profile.profileId.yearsOfExperince && (
              <p>Experience: {profile.profileId.yearsOfExperince}</p>
            )}
            {profile.email && <p>Contact Email: {profile.email} </p>}
          </section>
          {profile.socialMedia && (
            <section className={style.socialMediaContainer}>
              {profile.socialMedia.facebook && (
                <a
                  href={profile.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={style.socialMediaWrapper}>
                    <img src={facebook} alt="facebook"></img>
                  </div>
                </a>
              )}
              {profile.socialMedia.instagram && (
                <a
                  href={profile.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={style.socialMediaWrapper}>
                    <img src={insta} alt="insta"></img>
                  </div>
                </a>
              )}
            </section>
          )}
        </section>
        <section className={style.profileSessionsContainer}>
          {events && events.length > 0 && (
            <>
              {profile.profileId.firstName && (
                <h3 className={style.profileEvent}>
                  Upcomming {profile.profileId.firstName}’s Sessions
                </h3>
              )}
              <Slider {...settings}>
                {events.map((event, index) => (
                  <Card
                    key={event._id}
                    name={event.title}
                    image={event.image}
                    description={event.description}
                    itemId={event._id}
                    type="event"
                  />
                ))}
              </Slider>
            </>
          )}
        </section>
      </>
    )
  );
};
export default Profile;
