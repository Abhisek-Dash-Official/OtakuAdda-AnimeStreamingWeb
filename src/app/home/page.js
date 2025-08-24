"use client";

import { useState, useEffect } from "react";
import Slider from "../components/sections/Sliders";
import HeroBanner from "../components/sections/HeroBanner";
import AgeVerification from "../components/notification/AgeVerify";
import SubscriptionNotification from "../components/notification/Subscription";
import Loading from "../components/ui/Loading";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const eventsIMG = [
  "/assets/events/event1.png",
  "/assets/events/event2.png",
  "/assets/events/event3.png",
  "/assets/events/event4.png",
  "/assets/events/event5.png",
];

export default function Home() {
  const router = useRouter();
  const [popular, setPopular] = useState([]);
  const [kickstart, setKickstart] = useState([]);
  const [fans_loved, setFansLoved] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  useEffect(() => {
    async function showEvents() {
      for (const url of eventsIMG) {
        await Swal.fire({
          imageUrl: url,
          showConfirmButton: false,
          showCloseButton: true,
          allowOutsideClick: true,
          allowEscapeKey: true,
          backdrop: true,
          background: "transparent",
          customClass: {
            popup: "swal2-no-padding",
            closeButton: "swal2-close-light",
          },
        });
      }
    }
    showEvents();
    
    const fetchData = async () => {
      try {
        const response = await fetch("/API/homeContent");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const { popular, kickstart, fans_loved, trending } = data;
        setPopular(popular);
        setKickstart(kickstart);
        setFansLoved(fans_loved);
        setTrending(trending);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching home content:", error);
      }
    };
    fetchData();

    if (localStorage.getItem("age18Plus") !== "true") {
      setShowAgeModal(true);
    }

    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    if (!activeUser || !activeUser.email) {
      Swal.fire({
        title: "NO ACCOUNT FOUND!",
        text: "Login to continue",
        icon: "warning",
      }).then(router.push("/account/login"));
      return;
    }
    fetch(`/API/user-subscription?check=true&email=${activeUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.subscription_status !== "active") {
          setShowSubscriptionModal(true);
        }
      })
      .catch((error) => {
        console.error("Error checking subscription status:", error);
      });
  }, []);
  if (loading) {
    return <Loading />;
  }

  if (
    !popular.length &&
    !kickstart.length &&
    !fans_loved.length &&
    !trending.length
  ) {
    return <div>No content available</div>;
  }
  return (
    <div>
      {/* Age Verification Modal */}
      {showAgeModal && (
        <AgeVerification closeModal={() => setShowAgeModal(false)} />
      )}
      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <SubscriptionNotification
          closeModal={() => setShowSubscriptionModal(false)}
        />
      )}
      {/* Main Content */}
      <HeroBanner />
      <Slider data={popular} title="Popular Near You" />
      <Slider data={kickstart} title="Kickstart Your Anime Journey" />
      <Slider data={fans_loved} title="Anime Loved By Otaku Fans!" />
      <Slider data={trending} title="Trending Fantasy Anime" />
    </div>
  );
}
