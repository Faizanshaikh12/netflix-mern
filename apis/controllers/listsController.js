import List from "../models/List.js";

class ListsController {

    async allList(req, res) {
        const typeQuery = req.query.type;
        const genreQuery = req.query.genre;
        let list = [];
        try {
            if(typeQuery){
                if(genreQuery){
                    list = await List.aggregate([
                        { $sample: { size:10 } },
                        { $match: { type: typeQuery, genre: genreQuery } },
                    ]);
                }else{
                    list = await List.aggregate([
                        { $sample: { size:10 } },
                        { $match: { type: typeQuery } }
                    ]);
                }
            }else{
                list = await List.aggregate([{ $sample: { size:10 } }]);
            }
            res.status(200).json(list);
        } catch (err) {
            res.status(500).json({message: err});
        }
    }

    async createList(req, res) {
        if (req.user.isAdmin) {
            const newList = new List(req.body);
            try {
                const saveList = await newList.save();
                res.status(201).json(saveList);
            } catch (err) {
                res.status(500).json({message: err});
            }
        } else {
            res.status(403).json({message: 'You are not allowed!'});
        }
    }

    async updateList(req, res) {
        if (req.user.isAdmin) {
            try {
                const updatedList = await List.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
                res.status(200).json(updatedMovie);
            } catch (err) {
                res.status(500).json({message: err});
            }
        } else {
            res.status(403).json({message: 'You are not allowed!'});
        }
    }

    async deleteList(req, res) {
        if (req.user.isAdmin) {
            try {
                await List.findByIdAndDelete(req.params.id);
                res.status(200).json({message: 'List has been deleted...'});
            } catch (err) {
                res.status(500).json({message: err});
            }
        } else {
            res.status(500).json({message: 'You are not allowed!'});
        }
    }

}

export default new ListsController();
