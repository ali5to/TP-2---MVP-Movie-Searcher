window.addEventListener('offline', (event) =>{
    if(document.getElementById('offline')){
        document.getElementById('offline').classList.remove('hidden');
        console.log('offline');}
})

window.addEventListener('online', (event) =>{
    document.getElementById('offline').classList.add('hidden');
});

const loading = document.getElementById('loading');

$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        showLoading();
      let searchText = $('#searchText').val();
      getMovie(searchText);
      e.preventDefault();
    });
  });

  function showLoading() {
    loading.classList.toggle('hidden');
}




let searchbutton = document.getElementById('searchbutton');
let movieContainer = document.getElementById('movies');
let searchText = document.getElementById('searchText');


if (searchbutton != null) {
    searchbutton.addEventListener('click', () => {

        fetch(`https://www.omdbapi.com/?apikey=49fe4182&t=${searchText.value}`
        ).then(function (response) {
            console.log(response);
            return response.json();
        }).then(function (responseJSON) {
            console.log('print json', responseJSON);
            printData(responseJSON);
            return responseJSON;
        }).then((returnJSON) => addRemoveToList(returnJSON))
            .catch(function (error) {
                console.log('Error!', error)
            });

            showLoading();

    })
}


function printData(data) {
    showLoading();
    if (data.Response == 'False') {
        movieContainer.innerHTML = `<div class="card bg-white rounded-sm sahdow-lg overflow-hidden flex flex-col justify-center items-center filter drop-shadow-lg  transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 py-20 px-10">
        <p class="text-red-500 text-3xl font-bold">No results found</p>
</div>`;
    } else {
        movieContainer.innerHTML = `<div class="card bg-white rounded-sm sahdow-lg overflow-hidden flex flex-col justify-center items-center filter drop-shadow-lg  transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
        <article class="flex flex-col-reverse md:flex-row-reverse items-center">
            <div class="px-5 pb-5 pt-3">
                <h2 class="font-bold text-3xl text-red-500 mb-7">${data.Title}</h2>
                <div class="mb-10">
                    <span><strong>Year:</strong> ${data.Year} - </span>
                    <span><strong>Genre:</strong> ${data.Genre} - </span>
                    <span><strong>IMDB Rating:</strong> ${data.imdbRating} - </span>
                    <span><strong>Director:</strong> ${data.Director} - </span>
                    <span><strong>Writer:</strong> ${data.Writer} - </span>
                    <span><strong>Actors:</strong> ${data.Actors}</span>
                    <p class="mt-6"><strong>Synopsis:</strong> ${data.Plot}</p>
                </div>
                <a id="add" href="#" class= "px-10 py-5 text-white font-bold bg-blue-500 rounded">Add</a>
                <a id="remove" href="#"  class= "px-10 py-5 text-white font-bold bg-red-500 rounded">Remove</a>
                
            </div>
            <img class="object-center object-cover h-auto w-full" src="${data.Poster}" alt="Poster of ${data.Title}">
        </article>
</div>`;

    }
}

const addToStorage = (data) => {
    const list = JSON.parse(localStorage.getItem('Api response'));
    if (list == null) {
        const newList = [];
        newList.push(data);
        localStorage.setItem('Api response', JSON.stringify(newList));
    } else {
        const inList = list.some(item => item.Title === data.Title);
        if (!inList) {
            list.push(data);
            localStorage.setItem('Api response', JSON.stringify(list));
        }
    }
}

function removeFromStorage (data) {
    const list = JSON.parse(localStorage.getItem('Api response'));
    if (list == null) {
        const newList = [];
        newList.push(data);
        localStorage.setItem('Api response', JSON.stringify(newList));
    } else {
        const inList = list.some(item => item.Title !== data.Title);
        if (inList){
            let newList = list.filter(item => item.Title !== data.Title);
            localStorage.setItem('Api response', JSON.stringify(newList));
        }
    }
}

function addRemoveToList(data) {
    const add = document.getElementById('add');
    add.addEventListener('click', () => {
        addToStorage(data);
        console.log('add to list');
    })

    const remove = document.getElementById('remove');
    remove.addEventListener('click', () => {
        removeFromStorage(data);
        console.log('add to list');
    })

}


let listBox = document.getElementById('listBox');

const listStorage = JSON.parse(localStorage.getItem('Api response'));

            

function printList() {
    const showList = JSON.parse(localStorage.getItem('Api response'));
    listBox.innerHTML = "";

    if (showList != null) {
        for (let item of showList) {

            let movieCard = document.createElement('div');
            movieCard.classList.add('card', 'mb-10', 'bg-white', 'rounded-sm', 'sahdow-lg', 'overflow-hidden', 'flex', 'flex-col', 'justify-center', 'items-center', 'filter', 'drop-shadow-lg',  'transition', 'duration-300', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-105');
            listBox.appendChild(movieCard);

            let article = document.createElement('article');
            article.classList.add('flex', 'flex-col-reverse', 'md:flex-row-reverse', 'items-center');
            movieCard.appendChild(article);

            let divInfo = document.createElement('div');
            divInfo.classList.add('px-5', 'pb-5', 'pt-3');
            article.appendChild(divInfo);

            let title = document.createElement('h2');
            title.classList.add('font-bold', 'text-3xl', 'text-red-500','mb-7');
            title.innerHTML = item.Title;
            divInfo.appendChild(title);

            let year = document.createElement('span');
            year.innerHTML = `<strong>Year:</strong> ${item.Year}`;
            divInfo.appendChild(year); 

            let genre = document.createElement('span');
            genre.innerHTML = `<strong>Genre:</strong> ${item.Genre}`;
            divInfo.appendChild(genre); 

            let rating = document.createElement('span');
            rating.innerHTML = `<strong>Rating:</strong> ${item.imdbRating}`;
            divInfo.appendChild(rating);

            let director = document.createElement('span');
            director.innerHTML = `<strong>Director:</strong> ${item.Director}`;
            divInfo.appendChild(director);

            let writer = document.createElement('span');
            writer.innerHTML = `<strong>Writer:</strong> ${item.Writer}`;
            divInfo.appendChild(writer);

            let actors = document.createElement('span');
            actors.innerHTML = `<strong>Actors:</strong> ${item.Actors}`;
            divInfo.appendChild(actors);

            let plot = document.createElement('p');
            plot.classList.add('my-6');
            plot.innerHTML = `<strong>Plot:</strong> ${item.Plot}`;
            divInfo.appendChild(plot);

            let poster = document.createElement('img');
            poster.src = item.Poster;
            poster.alt = `Poster of ${item.Title}`;
            poster.classList.add('object-center', 'object-cover', 'h-auto', 'w-full');
            article.appendChild(poster);

            let a = document.createElement('a');
            a.classList.add('removeFromList', 'px-10', 'py-5', 'text-white', 'font-bold', 'bg-red-500', 'rounded', 'my-5');
            a.innerHTML = 'Remove';
            divInfo.appendChild(a);

            a.addEventListener('click', () => {
                console.log('Remove');
                removeFromStorage(item);


            })
            
        }
    }
}

printList();
