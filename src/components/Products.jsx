import React, {useState} from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import products from "./lists/products";

export default function Products(){  
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [price, setPrice] = useState({
    min: 0,
    max: Infinity
  });
  const [rating, setRating] = useState(0);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const handleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleMin = (e) => {
    setPrice({
      ...price,
      min: parseInt(e.target.value) || 0,
    });
  }

  const handleMax = (e) => {
    setPrice({
      ...price,
      max: parseInt(e.target.value) || Infinity,
    });
  }

  const handleRating = (e) => {
    e.persist();
    setRating(e.target.id);
  };

  function clearFilters(){
    setSelectedCategories([]);
    setPrice({
      min: 0,
      max: Infinity
    })
    setRating(0);
  }

  const filteredProducts = products.filter((product) => {
    
  const searchMatch = product.name.toLowerCase().includes(search.toLowerCase());
  const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
  const priceMatch = product.price >= price.min && product.price <= price.max;
  let ratingMatch = true;

  if (rating!==null){
    ratingMatch = Math.round(product.averageRating) >= rating;
  }

  return searchMatch && categoryMatch && priceMatch && ratingMatch;
});

  return (
    <div className="main">
      <div>
        <h4 id="products-title">
          <span role="img" aria-label="Yarn emoji">🧶</span> Shop
        </h4>
      </div>

      <div className="search">
        <input type="search" placeholder="Search..." onChange={handleSearch}/>
      </div>

      <div className="product-section">
        <div  className="row-left">
          <h3>Filters</h3>

          <div>
            <h4>Category</h4>
            <label>
              <input 
              type="checkbox" 
              value="Tops"
              className="checkbtn"
              checked={selectedCategories.includes('Tops')}
              onChange={() => handleCategory('Tops')}
              />
              <span>Tops</span>
            </label>
            <br/>
            <label>
            <input 
              type="checkbox" 
              value="Amigurumi"
              className="checkbtn"
              checked={selectedCategories.includes('Amigurumi')}
              onChange={() => handleCategory('Amigurumi')}
              />
              <span>Amigurumi</span>
            </label>
            <br/>
            <label>
            <input 
              type="checkbox" 
              value="Bags"
              className="checkbtn"
              checked={selectedCategories.includes('Bags')}
              onChange={() => handleCategory('Bags')}
              />
              <span>Bags</span>
            </label>
          </div>

          <div>
            <h4>Price</h4>
            <div class="flex-col">
              <input type="number" 
              value={price.min === 0 ? '' : price.min}
              placeholder="Min" 
              onChange={handleMin}
              />
              <input type="number" 
              value={price.max === Infinity ? '' : price.max}
              placeholder="Max" 
              onChange={handleMax}
              />
            </div>
          </div>

          <div>
            <h4>Rating</h4>
            <label>
              <input type="radio" name="rating" id="5" className="radiobtn" onChange={handleRating}/>
              <span>★★★★★ & Up</span>
            </label>
            <label>
              <input type="radio" name="rating" id="4" className="radiobtn" onChange={handleRating}/>
              <span>★★★★☆ & Up</span>
            </label>
            <label>
              <input type="radio" name="rating" id="3" className="radiobtn" onChange={handleRating}/>
              <span>★★★☆☆ & Up</span>
            </label>
            <label>
              <input type="radio" name="rating"  id="2" className="radiobtn" onChange={handleRating}/>
              <span>★★☆☆☆ & Up</span>
            </label>
            <label>
              <input type="radio" name="rating" id="1" className="radiobtn" onChange={handleRating}/>
              <span>★☆☆☆☆ & Up</span>
            </label>
            <label>
              <input type="radio" name="rating" id="0" className="radiobtn" 
              checked={rating===0}
              onChange={handleRating}/>
              <span>☆☆☆☆☆ & Up</span>
            </label>
          </div>

          <button 
          onClick={clearFilters}
          className="btn btn-outline-dark"
          >
            Clear Filters
          </button>
        </div>

        <div className="row-right">
          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <Link className="link" to={`/products/${product.id}`} key={product.id}>
                  <Card 
                    id={product.id}
                    img={product.img}
                    name={product.name}
                    price={product.price}
                    pcode={product.pcode}
                    averageRating={product.averageRating}
                    category={product.category}
                    desc={product.desc}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div>
              <h3>No items matching your search.</h3>
            </div>
          )}
        </div>
        
      </div>


    </div>
  );
}