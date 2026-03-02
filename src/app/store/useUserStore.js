import { create } from 'zustand';
import Api from "../../lib/axios"

export const useUserStore = create((set, get) => ({ 
user: null,
  loading: false,
  links: [],

  signUp: async ({email, password}) =>{
    try {
        const {data} = await Api.post("/auth/signUp", {email, password})
        set({use: data.user})
        return { success: true}
    } catch (error) {
        return { success: false, error: error.response?.data?.message };
        console.log('error from the register function');
        
    }
  }, 
  login: async ({email, password}) =>{
    try {
        const {data} = await Api.post("/auth/login", {email, password})
        set({use: data.user, links: data.user.links || []})
        return { success: true}
    } catch (error) {
        return { success: false, error: error.response?.data?.message };
        console.log('error from the register function');
        
    }
  }
,
logout: async ()=>{
    try {
        await Api.post("/auth/logout")
        set({user: null, link:[]})
    } catch (error) {
        console.log(error, "fail to logout");
    }
},

updateProfile: async (formData)=>{
   try {
        set({ loading: true });
        const { data } = await Api.put('/crud/update-profile', formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        set({ user: data.user, loading: false }); 
        toast.success("Profile updated successfully!"); 
    } catch (error) {
        set({ loading: false });
        const message = error.response?.data?.message || "Profile update failed";
        toast.error(message);
    }
    
},


addLink: () => set((state) => ({
    links: [...state.links, { id: Date.now().toString(), platform: 'GitHub', url: '' }]
  })),

  removeLink: (id) => set((state) => ({
    links: state.links.filter(l => l.id !== id && l._id !== id)
  })),

  updateLinkLocal: (id, field, value) => set((state) => ({
    links: state.links.map(l => (l.id === id || l._id === id) ? { ...l, [field]: value } : l)
  })),
  saveLinksToDB: async () => {
    try {
      const { links } = get();
      const { data } = await Api.put('/crud/update-links', { links });
      set({ links: data.links });
      toast("Links saved to Render!");
    } catch (error) {
      toast("Save failed");
    }
  }



}))


