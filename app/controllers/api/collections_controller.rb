class Api::CollectionsController < ApplicationController

  def index
    @collections = Collection.all
    render :index
  end

  def create
    @collection = Collection.create!(collection_params)
    render :show
  end

  private

  def collection_params
    params.require(:collection).permit(:title, :user_id)
  end
end
