import type { UserProfile } from "../useProfileStore";

export default (user: Ref<UserProfile | null>) => {
    
    async function updateOrCreateAbout(paragraph: string){
        return await useApiFetch('/api/abouts/', {
            method: 'POST',
            body: {paragraph},
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.about = event.response._data
                return event;
            }
        }) 
    }

    async function addWork(informations: any){
        return await useApiFetch("/api/works/", {
            method: 'POST',
            body: {...informations},
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.work = event.response._data
            }
        })
    }

    async function editWork(work_id: number, informations: any){
        return await useApiFetch("/api/works/" + work_id, {
            method: 'PUT',
            body: {...informations},
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.works = user.value.works.map(item => item.id == work_id ? event.response._data : item)
            }
        })
    }

    async function removeWork(work_id: number){
        return await useApiFetch("/api/works/" + work_id, {
            method: 'DELETE',
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.works = user.value.works.filter(item => item.id != work_id)
            }
        })
    }

    async function addSkill(informations: any){
        return await useApiFetch("/api/skills/", {
            method: 'POST',
            body: {...informations},
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.skills.push(event.response._data)
            }
        })
    }

    async function editSkill(skill_id: string, informations: any){
        return await useApiFetch("/api/skills/" + skill_id, {
            method: 'PUT',
            body: {...informations},
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.skills = user.value.skills.map(item => item.id == skill_id ? event.response._data : item)
            }
        })
    }

    async function removeSkill(skill_id: string){
        return await useApiFetch("/api/skills/" + skill_id, {
            method: 'DELETE',
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.skills = user.value.skills.filter(item => item.id != skill_id)
            }
        })
    }

    async function addEducation(informations: any){
        return await useApiFetch("/api/educations/", {
            method: 'POST',
            body: {...informations},
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.educations.push(event.response._data)
            }
        })
    }

    async function editEducation(education_id: number, informations: any){
        return await useApiFetch("/api/educations/" + education_id, {
            method: 'PUT',
            body: {...informations},
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.educations = user.value.educations.map(item => item.id == education_id ? event.response._data : item)
            }
        })
    }

    async function removeEducation(education_id: number){
        return await useApiFetch("/api/educations/" + education_id, {
            method: 'DELETE',
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.educations = user.value.educations.filter(item => item.id != education_id)
            }
        })
    }

    async function addCertification(informations: any){
        return await useApiFetch("/api/certifications/", {
            method: 'POST',
            body: {...informations},
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.certifications.push(event.response._data)
            }
        })
    }

    async function editCertification(certification_id: number, informations: any){
        return await useApiFetch("/api/certifications/" + certification_id, {
            method: 'PUT',
            body: {...informations},
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.certifications = user.value.certifications.map(item => item.id == certification_id  ? event.response._data : item)
            }
        })
    }

    async function removeCertification(certification_id: number){
        return await useApiFetch("/api/certifications/" + certification_id, {
            method: 'DELETE',
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.certifications = user.value.certifications.filter(item => item.id != certification_id)
            }
        })
    }

    async function addImage(informations: any){
        const formData = new FormData()
        formData.append("title", informations.title);
        formData.append("image", informations.image);
        return await useApiFetch("/api/images/", {
            method: 'POST',
            body: formData,
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.images.push(event.response._data)
            }
        })
    }

    async function editImage(Image_id: string, informations: any){
        const formData = new FormData()
        formData.append("title", informations.title);
        formData.append("image", informations.image);

        return await useApiFetch("/api/images/" + Image_id + "/update", {
            method: 'POST',
            body: formData,
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.images = user.value.images.map(item => item.id == Image_id ? event.response._data : item)
            }
        })
    }

    async function removeImage(Image_id: string){
        return await useApiFetch("/api/images/" + Image_id, {
            method: 'DELETE',
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.images = user.value.images.filter(item => item.id != Image_id)
            }
        })
    }

    async function addLink(informations: any){
        return await useApiFetch("/api/links/", {
            method: 'POST',
            body: informations,
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.links.push(event.response._data)
            }
        })
    }

    async function editLink(link_id: number, informations: any){
      
        return await useApiFetch("/api/links/" + link_id, {
            method: 'PUT',
            body: {...informations},
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.links = user.value.links.map(item => item.id == link_id ? event.response._data : item)
            }
        })
    }

    async function removeLink(link_id: number){
        return await useApiFetch("/api/links/" + link_id, {
            method: 'DELETE',
            onResponse(event){
                if(!user.value || !event.response.ok) return event
                user.value.links = user.value.links.filter(item => item.id != link_id)
            }
        })
    }

    return { addWork, editWork, addSkill, editSkill, addEducation, editEducation, addCertification, editCertification, addImage, editImage, addLink, editLink, updateOrCreateAbout, removeSkill, removeWork, removeEducation, removeCertification, removeLink, removeImage }
}