import type { Request, Response} from "express";
import { List } from "../models/list.js";

export const createList = async (req: Request, res: Response) => {
    try {
        const owner = (req as any).user?.id || (req as any).user?._id;
        const { name, postIds } = req.body;
        const list = await List.create({ name, owner, postIds });
        res.status(201).json(list);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong "})
    }
};

export const getUserLists = async (req: Request, res: Response) => {
    try {
        const owner = (req as any).user?.id || (req as any).user?._id;
        const lists =  await List.find({ owner}).sort({ createdAt: -1 });
        res.json(lists);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong "})
    }
}

export const getList =  async (req: Request, res: Response) => {
    try{
        const list = await List.findById(req.params.id);
        res.json(list);
    } catch (err){
        res.status(500).json({ error: "Something went wrong "})
    }
}

export const deleteList = async (req: Request, res: Response) => {
    try{
        const owner = (req as any).user?.id || (req as any).user?._id;
        const list = await List.findById(req.params.id);
        if(!list){
            return res.status(404).json({ message: "List not found"});
        }
        if(list.owner.toString() !== owner){
            return res.status(403).json({ message: "Unauthorized"});
        }
        await list.deleteOne();
        res.json({ message: "List deleted successfully"});

    }catch (err){
        res.status(500).json({ error: "Something went wrong "})
    }
}

export const updateList = async (req: Request, res: Response) => {
    try{
        const owner = (req as any).user?.id || (req as any).user?._id;
        const list = await List.findById(req.params.id);
        if(!list){
            return res.status(404).json({ message: "List not found"});
        }
        if(list.owner.toString() !== owner) return res.status(403).json({ message: "Unauthorized"});
        const {name, postIds} = req.body;
        if (name) list.name = name;
        if(Array.isArray(postIds)) list.postIds = postIds;
        await list.save();
        res.json(list); 
    }catch(err){
        res.status(500).json({ error: "Something went wrong "})
    }
}
