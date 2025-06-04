import { create } from "zustand";
import { IImage } from "../types/IImage";
import { getAllImages } from "../cruds/crudImage";

interface IStoreImages {
    images : IImage[],
    activeImage : IImage | null,
    fetchImages : () => Promise<void>

    setImages : (incomingImages : IImage[]) => void
    setActiveImage : (image : IImage | null) => void
}

export const useStoreImages = create<IStoreImages>((set) => ({
    images: [],
    activeImage: null,
        
    setImages: (incomingImages) => set({images: incomingImages}),
    
    setActiveImage: (incomingImage) => set({activeImage: incomingImage}),
    
    fetchImages : async () => {
        const imagesFetched = await getAllImages()
        set({images : imagesFetched})
    }
}))