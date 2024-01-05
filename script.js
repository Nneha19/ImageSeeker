let query,page=1;
let search=document.querySelector('#searchinput');
let submit=document.querySelector('.submit');
let main = document.querySelector('.main');

submit.addEventListener('click',(e)=>{  
  query=search.value;
  main.innerHTML='';
  fetchImages(query);
  submit.innerHTML='Loading'
})

function fetchImages(query) {
const Access_key='EpsPVvBa3cnZDWKE6PSnoJ-MlI3YkrvBN9bzQDPPOhk';
//const Access_key='9qgobCo_7HVX-9ncV2TOKZo4Sz1KcgdnugkTnmr0vuI';
//const Access_key='YyEfpootJQnkCNZc2qH-bw8jTQlzIu5JOiOZiou7LKg';
const apiUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${Access_key}`;

  try {
      fetch(apiUrl)
      .then(
         response=> response.json())
      .then(
        data=> {
        console.log(data);
        submit.innerHTML='Search'

        data.results.forEach(result => {
            const imagectn=document.createElement('div');
            imagectn.classList.add('img-item')
           
            const a=document.createElement('a');
            a.href=result.urls.regular;

            const img = document.createElement('img');
            img.src = result.urls.regular;
            img.classList.add('img-content')


            a.appendChild(img)
            imagectn.appendChild(a)
            main.appendChild(imagectn);
        });
        page++;
      })
      .catch(error=>{
        console.log(error)
      })
     } catch (error) {
      console.error('Error fetching images:', error);
  }

}

function isAtBottom() {
  const threshold=100;
  return window.innerHeight + window.scrollY >= document.body.offsetHeight-threshold;
}

window.addEventListener('scroll', () => {
  if (isAtBottom()) {
    fetchImages(query);
  }
});

window.addEventListener('touchmove', () => {
  if (isAtBottom()) {
    fetchImages(query);
  }
});









