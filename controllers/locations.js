import { MongoClient } from "mongodb";

export const getLocation = async (req, res) => {
    const uri = process.env.CONNECTION_URL
    const client = new MongoClient(uri);
    const { id } = req.params;

    try {
        const dbo = client.db("do-they-have-ac");
        const locations = dbo.collection("locations");
        const query = { _id: id };
        const location = await locations.findOne(query);
        res.status(200).json(location);
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

export async function createLocation(req, res) {
    const uri = process.env.CONNECTION_URL
    const client = new MongoClient(uri);
    const locationDocument = req.body;

    try {
        const dbo = client.db("do-they-have-ac");
        const locations = dbo.collection("locations");
        await locations.insertOne(locationDocument);
        res.status(201).json(locationDocument);
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

export const updateLocation = async (req, res) => {
    const uri = process.env.CONNECTION_URL
    const client = new MongoClient(uri);
    const { id } = req.params;
    const locationDocument = req.body;
    
    try {
        const dbo = client.db("do-they-have-ac");
        const locations = dbo.collection("locations");
        const filter = { _id: id };
        const options = { upsert: false };

        const updateDoc = {
            $set: {
                yes: locationDocument.yes,
                no: locationDocument.no,
                lastUpdated: locationDocument.lastUpdated
            },
        };

        const result = await locations.updateOne(filter, updateDoc, options);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}
