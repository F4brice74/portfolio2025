import { EditArticleClientPage } from "@/components/admin/EditArticleClientPage";

export default async function EditArticlePage({ 
    params 
}: { 
    params: Promise<{ id: string }> 
}) {
    const { id } = await params;
    return <EditArticleClientPage articleId={id} />;
}
