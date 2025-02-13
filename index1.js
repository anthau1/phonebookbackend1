import mongoose from 'mongoose';
class Phonebook {
    PhoneSchema;
    Phone;

    constructor() {


        const password = "fullstack"
        const url = 'mongodb+srv://fullstack:' + password + '@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority'
        mongoose.set('strictQuery', false)
        mongoose.connect(url).then(result=>console.log("Connection succeeded"))

        this.PhoneSchema =  new mongoose.Schema({
            id:   String,
            name: String,
            number: String,
        });
        this.Phone = mongoose.models.Phonebook1 ||  mongoose.model('Phonebook1', this.PhoneSchema)
    }
    async GetAll() {
        return   await this.Phone.find( {} );
    }

    Deletereord(id1)  {
        mongoose.models.Phonebook1.deleteMany( {"id": id1}).then((result)=>{console.log(result)})
    }
    Addrecord(fullname, phonenumber)  {
        const phone = new this.Phone({
            id:  parseInt(Math.random()*100000000000),
            name: fullname,
            number: phonenumber,
        })

        phone.save().then(result => {
            console.log('recod saved!')
        })
        console.log("FindAll");
    }

}

export default Phonebook