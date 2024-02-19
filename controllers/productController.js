const mongoose=require('mongoose');
const Product = require(`${__dirname}/../models/productModel`);

exports.addProduct = async (req, res, cb) => {
    try{
        let input = req.body;
        if(!input.name || !input.description || !input.price || !input.quantity || !input.category){
            res.status(400).json({
                message:'Please provide all required fields Name, Description, Price, Quantity, Category'
            });
        }else{
            const doc = await Product.create(input);
            res.status(201).json({
                status:'succes',
                data:{
                    data: doc
                }
            });
        }
    }catch (err){
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error' 
        });
    }
}

exports.getProduct = async (req, res, cb) => {
    try{
        let record;
        if(req.params.id){
            record = await Product.findById(req.params.id).select('-__v');
        }else if(req.query.name){
            record = await Product.find({ name: req.query.name }).select('-__v');
        }else{
            record = await Product.find().select('-__v');
        }
        res.status(200).json({
            status:'succes',
            data: record
        });
    }catch (err){
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error' 
        });
    }
}

exports.updateProduct = async (req, res, cb) => {
    try{
        let recordId;
        if(req.params.id){
            try {
                recordId = mongoose.Types.ObjectId(req.params.id);
            } catch (err) {
                recordId = mongoose.Types.ObjectId();
            }
            let record = await Product.findByIdAndUpdate(recordId, req.body, { new: true, upsert: true, runValidators: true });
            res.status(200).json({
                status:'succes',
                data: record
            });
        }else{
            res.status(404).json({
                message:'Record not found'
            });
        }   
    }catch (err){
        console.log(err);
        res.status(400).json({
            status: 'error',
            error: 'Invalid ObjectId provided',
        });    
    }
}

exports.deleteProduct = async (req, res, cb) => {
    try{
        let record;
        if(req.params.id){
            record = await Product.findByIdAndDelete(req.params.id);
        }else{
            record = await Product.deleteMany();
        }
        res.status(201).json({
            status:'succes',
            data: record
        });
        
    }catch (err){
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error' 
        });
    }
}