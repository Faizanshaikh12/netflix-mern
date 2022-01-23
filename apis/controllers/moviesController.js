import Movie from "../models/Movie.js";

class MoviesController {

    async allMovie(req, res) {
        if (req.user.isAdmin) {
            try {
                const movies = await Movie.find();
                res.status(201).json(movies.reverse());
            } catch (err) {
                res.status(500).json({message: err});
            }
        } else {
            res.status(403).json({message: 'You are not allowed to see all users!'});
        }
    }

    async getMovie(req, res) {
        try {
            const movie = await Movie.findById(req.params.id);
            res.status(201).json(movie);
        } catch (err) {
            res.status(500).json({message: err});
        }
    }

    async randomMovie(req, res) {
        const type = req.query.type;
        let movie;
        try {
            if(type === 'series'){
                movie = await Movie.aggregate([
                    { $match: { isSeries: true } },
                    { $sample: { size: 1 } },
                ]);
            }else{
                movie = await Movie.aggregate([
                    { $match: { isSeries: false } },
                    { $sample: { size: 1 } },
                ]);
            }
            res.status(201).json(movie);
        } catch (err) {
            res.status(500).json({message: err});
        }
    }
    
    async createMovie(req, res) {
        if (req.user.isAdmin) {
            const newMovie = new Movie(req.body);
            try {
                const saveMovie = await newMovie.save();
                res.status(201).json(saveMovie);
            } catch (err) {
                res.status(500).json({message: err});
            }
        } else {
            res.status(403).json({message: 'You are not allowed!'});
        }
    }

    async updateMovie(req, res) {
        if (req.user.isAdmin) {
            try {
                const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
                res.status(200).json(updatedMovie);
            } catch (err) {
                res.status(500).json({message: err});
            }
        } else {
            res.status(403).json({message: 'You are not allowed!'});
        }
    }

    async deleteMovie(req, res) {
        if (req.user.isAdmin) {
            try {
                await Movie.findByIdAndDelete(req.params.id);
                res.status(200).json({message: 'Movie has been deleted...'});
            } catch (err) {
                res.status(500).json({message: err});
            }
        } else {
            res.status(500).json({message: 'You are not allowed!'});
        }
    }

}

export default new MoviesController();
