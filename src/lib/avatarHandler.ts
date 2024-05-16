import type { SupabaseClient } from '@supabase/supabase-js'
import { createEventDispatcher } from 'svelte'

let avatarUrl: string | null = null
let uploading = false
let url: string | null = null
let files: FileList
let supabase: SupabaseClient
const dispatch = createEventDispatcher()

export const downloadImage = async (path: string, supabase: SupabaseClient) => {
    try {
        const { data, error } = await supabase.storage.from('storefront_photos').download(path)

        if (error) {
            throw error
        }

        url = URL.createObjectURL(data)
        //avatarUrl = url
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error downloading image: ', error.message)
        }
    }
}

export const uploadAvatar = async (supabase: SupabaseClient) => {
    try {
        uploading = true

        if (!files || files.length === 0) {
            throw new Error('You must select an image to upload.')
        }

        const file = files[0]
        const fileExt = file.name.split('.').pop()
        const filePath = `${Math.random()}.${fileExt}`

        const { error } = await supabase.storage.from('storefront_photos').upload(filePath, file)
        
        if (error) {
            throw error
        }

        await downloadImage(filePath, supabase);
        //url = avatarUrl
        avatarUrl = filePath
        dispatch('upload', filePath);
        await saveAvatarUrl(storeName, filePath);

        /*setTimeout(() => {
            dispatch('upload')
        }, 100)*/

    } catch (error) {
        if (error instanceof Error) {
            alert(error.message)
        }
    } finally {
        uploading = false
    }
}

async function saveAvatarUrl(store_name:string, avatarUrl:string) {
    const { data, error } = await supabase
    .from('storefronts')
    .update({ img_url: avatarUrl })
    .match({ store_name: store_name });

    if (error) {
        console.error('Error saving avatar URL:', error);
        // Handle error appropriately
    } else {
        console.log('Avatar URL saved successfully:', data);
    }
}

export const removeAvatar = async (supabase: SupabaseClient) => {
    try {
        // Remove the image from Supabase Storage
        if (avatarUrl!== null) {
            const { error } = await supabase.storage.from('storefront_photos').remove([avatarUrl]);
            if (error) {
            throw error;
            }

            // Clear the avatarUrl
            avatarUrl = null;

            // Update the database with an empty img_url
            await saveAvatarUrl(storeName, '');
        }
        else {
            console.warn('No avatar URL found to remove.');
        }
    } catch (error) {
        if (error instanceof Error) {
        console.error('Error removing avatar:', error.message);
        }
    }
};