import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../compontents/Spinner";
import ListingItem from "../compontents/ListingItem";

const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {

        const q = query(collection(db, "listings"), where("type", "==", params.categoryName));

        const querySnapshot = await getDocs(q);
        let listings = []
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots

        
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        });
        console.log(listings)

        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    };

    fetchListings();
  },[]);

  return <div className="category">
    <header>
        <p className="pageHeader">
            {params.categoryName==='rent' ? 'Places for rent' : 'Places for sale'}
        </p>
    </header>
    {loading ? <Spinner/> : listings && listings.length >0 ? <>
    
    <main>
        <ul className="categoryListings">
            {listings.map((listing) => (
                
                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
            ))}
        </ul>
    </main>
    
    </> : <p>No Listings for {params.categoryName}</p>}

  </div>;
};

export default Category;
