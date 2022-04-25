import dayjs from 'dayjs';


export function Film(id, title, favorite = false, watchdate = '', rating = 0) {
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    this.rating = rating;
    this.watchdate = watchdate && dayjs(watchdate);

    this.toString = () => {
        return `Id: ${this.id}, Title: ${this.title}, Favorite: ${this.favorite}, Watch date: ${this.watchdate || ''}, Rating: ${this.rating || "<not assigned>"}`;
    }
}

export function FilmLibrary() {
    this.films = [];

    this.addNewFilm = (film) => {
        if ( !this.films.some(f => f.id === film.id) ) {
            this.films.push(film)
        } else {
            throw new Error('Duplicate id');
        }
    };
    
    this.print = () => {
        console.log("Film list");
        this.films.forEach((film) => console.log(film.toString()));
    }

    this.sortByDate = () => {
        return [...this.films]
            .filter(x => x.watchdate)
            .sort((a,b) => a.watchdate.diff(b.watchdate))
            .concat(this.films.filter(x => !x.watchdate));
    };
    
    this.deleteFilm = id => this.films = this.films.filter(x => x.id !== id);

    this.resetWatchedFilms = () => this.films.forEach(x => x.watchdate = '');

    this.getRated = () => {
        return this.films
                .filter(x => x.rating > 0)
                .sort((a,b) => b.rating - a.rating);
    };

    this.getFavorites = () => {
        return this.films.filter(x => x.favorite);
    };

    this.getLastSeen = () => {
        return this.sortByDate().filter(x => x.watchdate).reverse()[0];
    };

    this.getSeenLastMonth = () => {
        return [...this.films]
            .filter(x => { return x.watchdate && dayjs().subtract(30, 'days').diff(x.watchdate) < 30; })
    };
}