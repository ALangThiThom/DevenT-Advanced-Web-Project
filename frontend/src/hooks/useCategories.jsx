import { useState, useEffect } from "react"; // Added useEffect here
import axios from "axios";                   // Added axios import here

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/api/categories")
      .then(res => {
        if (res.data.success) {
          setCategories(res.data.data);
        }
      })
      .catch(err => {
        console.error("Error fetching categories from Backend:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { categories, loading };
};

export default useCategories;