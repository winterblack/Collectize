class Api::CollectionsController < ApplicationController

  def create
    @collection = Collection.create!(collection_params)
    render json: @collection
  end

  def index
    if params[:search]
      @collections = Collection.where("lower(title) ~ ?", params[:search].downcase)
    else
      @collections = Collection.all
    end
  end

  def update
    @collection = Collection.find(params[:id])
    @collection.update(collection_params)
    render json: @collection
  end

  def destroy
    @collection = Collection.find(params[:id])
    @collection.destroy
    render json: @collection
  end

  private

  def collection_params
    params.require(:collection).permit(:title, :user_id)
  end
end
