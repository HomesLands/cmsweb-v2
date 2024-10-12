import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'

import { createProject, getProjects } from '@/api'
import { ICreateProject } from '@/types'
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
