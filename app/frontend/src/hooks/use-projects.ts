import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createProject, getProjects, updateProject } from '@/api'
import { ICreateProject, IUpdateProject } from '@/types'
import { CreateProject } from '@/views/projects'

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
    placeholderData: keepPreviousData
  })
}

export const useCreateProject = () => {
  return useMutation({ mutationFn: (data: ICreateProject) => createProject(data) })
}

export const useUpdateProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: IUpdateProject) => updateProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })
}
